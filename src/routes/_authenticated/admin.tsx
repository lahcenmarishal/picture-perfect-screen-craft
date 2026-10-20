import { useLanguage } from "@/components/LanguageProvider";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState, type FormEvent } from "react";
import { supabase } from "@/integrations/supabase/client";
import {
  fetchProjects, PROJECT_CATEGORIES, updateProject,
  fetchProjectImages, addProjectImages, deleteProjectImage,
  type ProjectRow, type ProjectImageRow,
} from "@/lib/projects";
import { fetchQuoteRequests, deleteQuoteRequest, type QuoteRequestRow } from "@/lib/quote-requests";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export const Route = createFileRoute("/_authenticated/admin")({
  head: () => ({
    meta: [
      { title: "Administration des réalisations — Cabinet FATNASSI" },
      { name: "description", content: "Gestion des réalisations du cabinet." },
      { property: "og:title", content: "Administration" },
      { property: "og:description", content: "Gestion des réalisations." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: AdminPage,
});

function AdminPage() {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null);
  const [uid, setUid] = useState("");
  const [projects, setProjects] = useState<ProjectRow[]>([]);
  const [requests, setRequests] = useState<QuoteRequestRow[]>([]);
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState<string>("Villas");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState("");

  const reload = () => fetchProjects().then(setProjects).catch(() => setMsg("Erreur de chargement."));
  const reloadRequests = () => fetchQuoteRequests().then(setRequests).catch(() => setRequests([]));

  useEffect(() => {
    (async () => {
      const { data: u } = await supabase.auth.getUser();
      if (!u.user) return;
      setUid(u.user.id);
      const { data } = await supabase.rpc("has_role", { _user_id: u.user.id, _role: "admin" });
      setIsAdmin(!!data);
      if (data) { reload(); reloadRequests(); }
    })();
  }, []);

  async function logout() {
    await supabase.auth.signOut();
    navigate({ to: "/auth" });
  }

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setBusy(true);
    setMsg("");
    try {
      let image_path: string | null = null;
      if (file) {
        const ext = file.name.split(".").pop() || "jpg";
        image_path = `${crypto.randomUUID()}.${ext}`;
        const { error } = await supabase.storage.from("projects").upload(image_path, file, { contentType: file.type });
        if (error) throw error;
      }
      const { error } = await supabase.from("projects").insert({
        title, category, location: location || null, description: description || null, image_path,
      });
      if (error) throw error;
      setTitle(""); setLocation(""); setDescription(""); setFile(null);
      (e.target as HTMLFormElement).reset();
      setMsg("Réalisation ajoutée.");
      reload();
    } catch {
      setMsg("Échec de l'ajout.");
    } finally {
      setBusy(false);
    }
  }

  async function remove(p: ProjectRow) {
    if (!confirm(`${t("Supprimer ce projet ?")} « ${p.title} »`)) return;
    if (p.image_path) await supabase.storage.from("projects").remove([p.image_path]);
    await supabase.from("projects").delete().eq("id", p.id);
    reload();
  }

  if (isAdmin === null) return <section className="mx-auto max-w-5xl px-5 py-24">{t("Chargement…")}</section>;

  if (!isAdmin) return (
    <section className="mx-auto max-w-xl px-5 py-24">
      <h1 className="text-3xl">{t("Accès refusé")}</h1>
      <p className="mt-3 text-muted-foreground">{t("Ce compte n'a pas le rôle administrateur.")}</p>
      <p className="mt-2 break-all text-xs text-muted-foreground">UID : {uid}</p>
      <Button variant="outline" className="mt-6" onClick={logout}>{t("Se déconnecter")}</Button>
    </section>
  );

  async function removeRequest(r: QuoteRequestRow) {
    if (!confirm(`${t("Supprimer cette demande ?")} « ${r.name} »`)) return;
    await deleteQuoteRequest(r.id);
    reloadRequests();
  }

  return (
    <section className="mx-auto max-w-5xl px-5 py-16">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl">{t("Administration")}</h1>
        <Button variant="outline" onClick={logout}>{t("Se déconnecter")}</Button>
      </div>

      <h2 className="mt-12 text-2xl">{t("Demandes de contact & devis")}</h2>
      <div className="mt-6 space-y-4">
        {requests.map((r) => (
          <article key={r.id} className="border border-border p-5">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <h3 className="text-lg">{r.name} <span className="text-sm text-gold">— {r.project_type}</span></h3>
                <p className="text-sm text-muted-foreground">
                  {r.email} · {r.phone}{r.location ? ` · ${r.location}` : ""}
                </p>
              </div>
              <div className="flex items-center gap-3">
                <time className="text-xs text-muted-foreground">{new Date(r.created_at).toLocaleString("fr-FR")}</time>
                <Button variant="destructive" size="sm" onClick={() => removeRequest(r)}>{t("Supprimer")}</Button>
              </div>
            </div>
            <p className="mt-3 whitespace-pre-line text-sm">{r.message}</p>
            {r.attachment_names && <p className="mt-2 text-xs text-muted-foreground">{t("Fichiers annoncés :")} {r.attachment_names}</p>}
          </article>
        ))}
        {!requests.length && <p className="text-muted-foreground">{t("Aucune demande pour le moment.")}</p>}
      </div>

      <h2 className="mt-16 text-2xl">{t("Réalisations")}</h2>

      <form onSubmit={onSubmit} className="mt-10 grid gap-4 border border-border p-6 md:grid-cols-2">
        <div className="space-y-2"><Label htmlFor="title">{t("Titre")}</Label>
          <Input id="title" required value={title} onChange={(e) => setTitle(e.target.value)} /></div>
        <div className="space-y-2"><Label htmlFor="cat">{t("Catégorie")}</Label>
          <select id="cat" value={category} onChange={(e) => setCategory(e.target.value)}
            className="h-9 w-full rounded-md border border-input bg-background px-3 text-sm">
            {PROJECT_CATEGORIES.map((c) => <option key={c} value={c}>{t(c)}</option>)}
          </select></div>
        <div className="space-y-2"><Label htmlFor="loc">{t("Lieu")}</Label>
          <Input id="loc" value={location} onChange={(e) => setLocation(e.target.value)} /></div>
        <div className="space-y-2"><Label htmlFor="img">{t("Photo")}</Label>
          <Input id="img" type="file" accept="image/*" onChange={(e) => setFile(e.target.files?.[0] ?? null)} /></div>
        <div className="space-y-2 md:col-span-2"><Label htmlFor="desc">{t("Description")}</Label>
          <Textarea id="desc" value={description} onChange={(e) => setDescription(e.target.value)} /></div>
        <div className="flex items-center gap-4 md:col-span-2">
          <Button type="submit" disabled={busy}>{busy ? t("Ajout…") : t("Ajouter la réalisation")}</Button>
          {msg && <span className="text-sm text-muted-foreground">{t(msg)}</span>}
        </div>
      </form>

      <div className="mt-10 space-y-6">
        {projects.map((p) => (
          <ProjectCard key={p.id} project={p} onChanged={reload} onRemove={() => remove(p)} />
        ))}
        {!projects.length && <p className="text-muted-foreground">{t("Aucune réalisation pour le moment.")}</p>}
      </div>
    </section>
  );
}

function ProjectCard({ project, onChanged, onRemove }: { project: ProjectRow; onChanged: () => void; onRemove: () => void }) {
  const { t } = useLanguage();
  const [editing, setEditing] = useState(false);
  const [title, setTitle] = useState(project.title);
  const [category, setCategory] = useState(project.category);
  const [location, setLocation] = useState(project.location ?? "");
  const [description, setDescription] = useState(project.description ?? "");
  const [photo, setPhoto] = useState<File | null>(null);
  const [gallery, setGallery] = useState<ProjectImageRow[]>([]);
  const [galleryFiles, setGalleryFiles] = useState<FileList | null>(null);
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState("");

  const reloadGallery = () => fetchProjectImages(project.id).then(setGallery).catch(() => setGallery([]));
  useEffect(() => { reloadGallery(); }, [project.id]);

  async function save(e: FormEvent) {
    e.preventDefault();
    setBusy(true); setMsg("");
    try {
      await updateProject(project.id, { title, category, location, description }, photo);
      setMsg("Réalisation mise à jour.");
      setEditing(false);
      onChanged();
    } catch {
      setMsg("Échec de la mise à jour.");
    } finally {
      setBusy(false);
    }
  }

  async function addToGallery() {
    if (!galleryFiles?.length) return;
    setBusy(true); setMsg("");
    try {
      await addProjectImages(project.id, Array.from(galleryFiles));
      setGalleryFiles(null);
      setMsg("Photos ajoutées à la galerie.");
      reloadGallery();
    } catch {
      setMsg("Échec de l'ajout des photos.");
    } finally {
      setBusy(false);
    }
  }

  async function removeFromGallery(img: ProjectImageRow) {
    if (!confirm(t("Supprimer cette photo de la galerie ?"))) return;
    await deleteProjectImage(img);
    reloadGallery();
  }

  return (
    <article className="border border-border">
      <div className="grid gap-6 p-5 md:grid-cols-[240px_1fr]">
        <div>
          {project.image_url ? (
            <img src={project.image_url} alt={project.title} className="aspect-[4/3] w-full object-cover" />
          ) : (
            <div className="flex aspect-[4/3] items-center justify-center border border-dashed border-border text-xs text-muted-foreground">{t("Aucune photo principale")}</div>
          )}
        </div>
        <div>
          <span className="text-xs uppercase tracking-wider text-gold">{t(project.category)}</span>
          <h3 className="mt-1 text-xl">{project.title}</h3>
          {project.location && <p className="mt-1 text-sm text-muted-foreground">{project.location}</p>}
          {project.description && <p className="mt-2 text-sm text-muted-foreground">{project.description}</p>}
          <div className="mt-4 flex gap-3">
            <Button variant="outline" size="sm" onClick={() => setEditing(!editing)}>{editing ? t("Annuler") : t("Modifier")}</Button>
            <Button variant="destructive" size="sm" onClick={onRemove}>{t("Supprimer")}</Button>
          </div>
          {msg && <p className="mt-2 text-sm text-muted-foreground">{t(msg)}</p>}
        </div>
      </div>

      {editing && (
        <form onSubmit={save} className="grid gap-4 border-t border-border p-5 md:grid-cols-2">
          <div className="space-y-2"><Label>{t("Titre")}</Label>
            <Input required value={title} onChange={(e) => setTitle(e.target.value)} /></div>
          <div className="space-y-2"><Label>{t("Catégorie")}</Label>
            <select value={category} onChange={(e) => setCategory(e.target.value)}
              className="h-9 w-full rounded-md border border-input bg-background px-3 text-sm">
              {PROJECT_CATEGORIES.map((c) => <option key={c} value={c}>{t(c)}</option>)}
            </select></div>
          <div className="space-y-2"><Label>{t("Lieu")}</Label>
            <Input value={location} onChange={(e) => setLocation(e.target.value)} /></div>
          <div className="space-y-2"><Label>{t("Remplacer la photo principale")}</Label>
            <Input type="file" accept="image/*" onChange={(e) => setPhoto(e.target.files?.[0] ?? null)} /></div>
          <div className="space-y-2 md:col-span-2"><Label>{t("Description")}</Label>
            <Textarea value={description} onChange={(e) => setDescription(e.target.value)} /></div>
          <div className="md:col-span-2">
            <Button type="submit" disabled={busy}>{busy ? t("Enregistrement…") : t("Enregistrer les modifications")}</Button>
          </div>
        </form>
      )}

      <div className="border-t border-border p-5">
        <h4 className="text-sm font-medium">{t("Galerie photos")} ({gallery.length})</h4>
        <div className="mt-3 flex flex-wrap items-center gap-3">
          <Input type="file" accept="image/*" multiple className="max-w-xs"
            onChange={(e) => setGalleryFiles(e.target.files)} />
          <Button variant="outline" size="sm" disabled={busy || !galleryFiles?.length} onClick={addToGallery}>
            {busy ? t("Ajout…") : t("Ajouter à la galerie")}
          </Button>
        </div>
        {gallery.length > 0 && (
          <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-6">
            {gallery.map((img) => (
              <div key={img.id} className="group relative">
                {img.image_url && <img src={img.image_url} alt="" className="aspect-square w-full object-cover" />}
                <button type="button" aria-label={t("Supprimer cette photo de la galerie ?")} onClick={() => removeFromGallery(img)}
                  className="absolute right-1 top-1 rounded bg-destructive px-2 py-0.5 text-xs text-destructive-foreground opacity-0 transition group-hover:opacity-100">
                  ✕
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </article>
  );
}
