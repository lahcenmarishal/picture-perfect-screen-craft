import { supabase } from "@/integrations/supabase/client";

export type QuoteRequestRow = {
  id: string;
  name: string;
  phone: string;
  email: string;
  project_type: string;
  location: string | null;
  message: string;
  attachment_names: string | null;
  created_at: string;
};

export type QuoteRequestInput = {
  name: string;
  phone: string;
  email: string;
  project_type: string;
  location?: string;
  message: string;
  attachment_names?: string;
};

/** Sends a contact/quote request to the cabinet (stored for the admin). */
export async function submitQuoteRequest(input: QuoteRequestInput): Promise<void> {
  const { error } = await supabase.from("quote_requests").insert({
    name: input.name.trim().slice(0, 100),
    phone: input.phone.trim().slice(0, 30),
    email: input.email.trim().slice(0, 255),
    project_type: input.project_type.trim().slice(0, 100),
    location: input.location?.trim().slice(0, 150) || null,
    message: input.message.trim().slice(0, 2000),
    attachment_names: input.attachment_names?.slice(0, 500) || null,
  });
  if (error) throw error;
}

/** Lists quote requests (admins only, enforced server-side). */
export async function fetchQuoteRequests(): Promise<QuoteRequestRow[]> {
  const { data, error } = await supabase
    .from("quote_requests")
    .select("*")
    .order("created_at", { ascending: false });
  if (error) throw error;
  return (data ?? []) as QuoteRequestRow[];
}

export async function deleteQuoteRequest(id: string): Promise<void> {
  const { error } = await supabase.from("quote_requests").delete().eq("id", id);
  if (error) throw error;
}
