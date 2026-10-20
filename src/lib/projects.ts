import { supabase } from "@/integrations/supabase/client";

export const PROJECT_CATEGORIES = ["Villas", "Résidentiel", "Industriel", "Autres"] as const;

export type ProjectRow = {
  id: string;
  title: string;
  category: string;
  location: string | null;
  description: string | null;
  image_path: string | null;
  created_at: string;
  image_url?: string | null;
};

export type ProjectImageRow = {
  id: string;
  project_id: string;
  image_path: string;
  position: number;
  created_at: string;
  image_url?: string | null;
};

/** Creates temporary image links for storage paths (the bucket is private). */
async function signPaths(paths: string[]): Promise<Map<string, string>> {
  if (!paths.length) return new Map();
  const { data: signed } = await supabase.storage.from("projects").createSignedUrls(paths, 60 * 60 * 24);
  const map = new Map<string, string>();
  for (const s of signed ?? []) {
    if (s.path && s.signedUrl) map.set(s.path, s.signedUrl);
  }
  return map;
}

/** Lists projects with temporary image links (the image bucket is private). */
export async function fetchProjects(): Promise<ProjectRow[]> {
  const { data, error } = await supabase.from("projects").select("*").order("created_at", { ascending: false });
  if (error) throw error;
  const rows = (data ?? []) as ProjectRow[];
  const map = await signPaths(rows.map((r) => r.image_path).filter((p): p is string => !!p));
  rows.forEach((r) => { r.image_url = r.image_path ? map.get(r.image_path) ?? null : null; });
  return rows;
}

export type ProjectUpdate = {
  title: string;
  category: string;
  location?: string;
  description?: string;
};

/** Updates a project's info, optionally replacing its main photo. */
export async function updateProject(id: string, input: ProjectUpdate, newPhoto?: File | null): Promise<void> {
  let image_path: string | undefined;
  if (newPhoto) {
    const ext = newPhoto.name.split(".").pop() || "jpg";
    image_path = `${crypto.randomUUID()}.${ext}`;
    const { error } = await supabase.storage.from("projects").upload(image_path, newPhoto, { contentType: newPhoto.type });
    if (error) throw error;
  }
  const { error } = await supabase.from("projects").update({
    title: input.title.trim().slice(0, 150),
    category: input.category,
    location: input.location?.trim().slice(0, 150) || null,
    description: input.description?.trim().slice(0, 2000) || null,
    ...(image_path ? { image_path } : {}),
  }).eq("id", id);
  if (error) throw error;
}

/** Lists gallery images of a project with temporary links. */
export async function fetchProjectImages(projectId: string): Promise<ProjectImageRow[]> {
  const { data, error } = await supabase
    .from("project_images")
    .select("*")
    .eq("project_id", projectId)
    .order("position", { ascending: true })
    .order("created_at", { ascending: true });
  if (error) throw error;
  const rows = (data ?? []) as ProjectImageRow[];
  const map = await signPaths(rows.map((r) => r.image_path));
  rows.forEach((r) => { r.image_url = map.get(r.image_path) ?? null; });
  return rows;
}

/** Adds photos to a project's gallery. */
export async function addProjectImages(projectId: string, files: File[]): Promise<void> {
  for (const [i, file] of files.entries()) {
    const ext = file.name.split(".").pop() || "jpg";
    const image_path = `gallery/${projectId}/${crypto.randomUUID()}.${ext}`;
    const { error: upErr } = await supabase.storage.from("projects").upload(image_path, file, { contentType: file.type });
    if (upErr) throw upErr;
    const { error } = await supabase.from("project_images").insert({ project_id: projectId, image_path, position: i });
    if (error) throw error;
  }
}

/** Removes a photo from a project's gallery. */
export async function deleteProjectImage(image: ProjectImageRow): Promise<void> {
  await supabase.storage.from("projects").remove([image.image_path]);
  const { error } = await supabase.from("project_images").delete().eq("id", image.id);
  if (error) throw error;
}
