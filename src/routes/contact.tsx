import { useLanguage } from "@/components/LanguageProvider";
import { createFileRoute } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { OfficeContactLinks, PageHeader } from "@/components/SiteLayout";
import { OfficeMaps } from "@/components/OfficeMaps";
import { contact } from "@/lib/site";
import { submitQuoteRequest } from "@/lib/quote-requests";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact & devis — Cabinet FATNASSI Architecte" },
      { name: "description", content: "Demandez un devis au cabinet d'architecture FATNASSI à Casablanca." },
      { property: "og:title", content: "Contact & devis" },
      { property: "og:description", content: "Parlez-nous de votre projet, nous vous répondrons rapidement." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Contact,
});

const MAX = 10 * 1024 * 1024;
const OK = ["application/pdf", "image/jpeg", "image/png"];
const field = "w-full border border-input bg-transparent px-4 py-3 text-sm outline-none focus:border-gold";

function Contact() {
  const { t } = useLanguage();
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const files = data.getAll("files") as File[];
    for (const f of files) {
      if (!f.size) continue;
      if (!OK.includes(f.type)) return setError("Formats acceptés : PDF, JPG, PNG.");
      if (f.size > MAX) return setError("Chaque fichier doit faire moins de 10 Mo.");
    }
    setError("");
    setBusy(true);
    try {
      await submitQuoteRequest({
        name: String(data.get("name") ?? ""),
        phone: String(data.get("phone") ?? ""),
        email: String(data.get("email") ?? ""),
        project_type: String(data.get("type") ?? ""),
        location: String(data.get("location") ?? ""),
        message: String(data.get("message") ?? ""),
        attachment_names: files.filter((f) => f.size).map((f) => f.name).join(", "),
      });
      setSent(true);
    } catch {
      setError("L’envoi a échoué. Réessayez dans un instant.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <>
      <PageHeader eyebrow={t("Contact & devis")} title={t("Parlez-nous de votre projet")} />
      <section className="mx-auto grid max-w-7xl gap-14 px-5 py-20 lg:grid-cols-[1fr_2fr]">
        <div className="space-y-4 text-sm">
          <p className="text-muted-foreground">{t("Nous vous répondrons dans les meilleurs délais.")}</p>
          <OfficeContactLinks />
          <p>{t(contact.city)}</p>
        </div>
        {sent ? (
          <div className="border border-gold p-12" role="status">
            <h2 className="text-4xl">{t("Merci, votre demande est bien envoyée.")}</h2>
            <p className="mt-4 text-muted-foreground">{t("Le cabinet vous répondra dans les meilleurs délais.")}</p>
          </div>
        ) : (
          <form onSubmit={submit} className="grid gap-5 sm:grid-cols-2">
            <label className="text-xs">{t("Nom complet *")}<input required name="name" maxLength={100} className={field} /></label>
            <label className="text-xs">{t("Téléphone *")}<input required name="phone" type="tel" maxLength={30} className={field} /></label>
            <label className="text-xs">{t("E-mail *")}<input required name="email" type="email" maxLength={255} className={field} /></label>
            <label className="text-xs">{t("Type de projet *")}<select required name="type" className={field + " bg-background"} defaultValue="">
                <option value="" disabled>{t("Sélectionnez")}</option>
                <option>{t("Villa")}</option><option>{t("Immeuble résidentiel")}</option><option>{t("Bâtiment industriel")}</option>
                <option>{t("Permis de construire")}</option><option>{t("Autre")}</option>
              </select>
            </label>
            <label className="text-xs sm:col-span-2">{t("Localisation du projet")}<input name="location" maxLength={150} className={field} /></label>
            <label className="text-xs sm:col-span-2">{t("Décrivez votre projet *")}<textarea required name="message" rows={5} maxLength={2000} className={field} /></label>
            <label className="text-xs sm:col-span-2">{t("Joindre des fichiers (plans, croquis…) — PDF, JPG, PNG, 10 Mo max")}<input name="files" type="file" multiple accept=".pdf,.jpg,.jpeg,.png" className={field} />
            </label>
            {error && <p className="text-sm text-destructive sm:col-span-2" role="alert">{t(error)}</p>}
            <button type="submit" disabled={busy} className="btn-gold justify-center sm:col-span-2">{busy ? t("Envoi…") : t("Envoyer ma demande →")}</button>
          </form>
        )}
      </section>
      <OfficeMaps />
    </>
  );
}
