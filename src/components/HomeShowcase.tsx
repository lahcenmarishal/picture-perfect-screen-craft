import { useLanguage } from "@/components/LanguageProvider";
import { useEffect, useState, type FormEvent } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowRight, MapPin, Mail, Paperclip } from "lucide-react";
import { Button } from "@/components/ui/button";
import { OfficeContactLinks } from "@/components/SiteLayout";
import hero from "@/assets/hero-villa.jpg";
import residence from "@/assets/residence.jpg";
import industrial from "@/assets/industrial.jpg";
import villa from "@/assets/villa-garden.jpg";
import plans from "@/assets/plans.jpg";
import { logoUrl } from "@/lib/brand-assets";
import { contact } from "@/lib/site";
import { fetchProjects } from "@/lib/projects";
import { submitQuoteRequest } from "@/lib/quote-requests";

const fallbackProjects = [
  { title: "Villa moderne à Casablanca", category: "Villas", image: hero },
  { title: "Immeuble résidentiel", category: "Résidentiel", image: residence },
  { title: "Bâtiment industriel", category: "Industriel", image: industrial },
  { title: "Villa contemporaine", category: "Villas", image: villa },
];

/** Local illustration matched by title until real project photography exists. */
const localImages: Record<string, string> = Object.fromEntries(fallbackProjects.map((p) => [p.title, p.image]));

export function ProjectGallery() {
  const { t } = useLanguage();
  const [category, setCategory] = useState("Tous");
  const [projects, setProjects] = useState(fallbackProjects);

  useEffect(() => {
    fetchProjects()
      .then((rows) => {
        if (!rows.length) return;
        setProjects(rows.map((r) => ({
          title: r.title,
          category: r.category,
          image: r.image_url ?? localImages[r.title] ?? hero,
        })));
      })
      .catch(() => { /* keep local illustrations */ });
  }, []);
  return <section className="home-projects"><div className="site-container">
    <div className="projects-heading"><div><h2>{t("Nos réalisations")}</h2><p>{t("Une sélection d’ambiances architecturales · Illustrations")}</p></div>
      <div className="project-filters" role="tablist" aria-label={t("Catégories de projets")}>
        {["Tous", "Villas", "Résidentiel", "Industriel", "Autres"].map(c => <Button key={t(c)} variant="ghost" role="tab" aria-selected={category === c} onClick={() => setCategory(c)} className={category === c ? "filter-active" : ""}>{t(c)}</Button>)}
      </div>
    </div>
    <div className="project-grid">{projects.filter(p => category === "Tous" || p.category === category).map(p => <article className="project-item" key={t(p.title)}>
      <img src={p.image} alt={`${t(p.title)} — ${t("Illustration architecturale")}`} loading="lazy" width={1024} height={640}/>
      <div><span>{t(p.category)}</span><h3>{t(p.title)}</h3><Button asChild variant="link"><Link to="/realisations">{t("Voir le projet")}<ArrowRight/></Link></Button></div>
    </article>)}</div>
    {category === "Autres" && <p className="gallery-empty">{t("Aucun projet dans cette catégorie pour le moment.")}</p>}
  </div></section>;
}

export function HomeContact() {
  const { t } = useLanguage();
  const [status, setStatus] = useState("");
  const [busy, setBusy] = useState(false);
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    const files = data.getAll("files") as File[];
    if (files.some(f => f.size > 10 * 1024 * 1024)) { setStatus("Chaque fichier doit faire moins de 10 Mo."); return; }
    if (files.some(f => f.size && !["application/pdf", "image/jpeg", "image/png"].includes(f.type))) { setStatus("Formats acceptés : PDF, JPG, PNG."); return; }
    setBusy(true);
    try {
      await submitQuoteRequest({
        name: String(data.get("name") ?? ""),
        phone: String(data.get("phone") ?? ""),
        email: String(data.get("email") ?? ""),
        project_type: String(data.get("type") ?? ""),
        message: String(data.get("message") ?? ""),
        attachment_names: files.filter(f => f.size).map(f => f.name).join(", "),
      });
      form.reset();
      setStatus("Votre demande a bien été envoyée au cabinet.");
    } catch {
      setStatus("L’envoi a échoué. Réessayez dans un instant.");
    } finally {
      setBusy(false);
    }
  }
  return <section className="home-contact">
    <img src={plans} alt="" className="contact-background" loading="lazy" width={1200} height={912}/>
    <div className="site-container contact-layout">
      <div className="contact-details"><h2>{t("Contact & Devis")}</h2><p>{t("Parlez-nous de votre projet, nous vous répondrons rapidement.")}</p>
        <OfficeContactLinks />
        <div><MapPin/><span>{t(contact.city)}</span></div>
        <div><Mail/><span>{contact.email || t("E-mail à confirmer")}</span></div>
      </div>
      <form className="home-quote-form" onSubmit={submit}>
        <div className="quote-top"><label>{t("Nom complet *")}<input name="name" required autoComplete="name"/></label><label>{t("Téléphone *")}<input name="phone" type="tel" required autoComplete="tel"/></label><label>{t("E-mail *")}<input name="email" type="email" required autoComplete="email"/></label></div>
        <div className="quote-bottom"><div><label>{t("Type de projet *")}<select name="type" defaultValue="" required><option value="" disabled>{t("Sélectionnez")}</option><option>{t("Villa")}</option><option>{t("Immeuble résidentiel")}</option><option>{t("Bâtiment industriel")}</option><option>{t("Permis de construire")}</option><option>{t("Autre")}</option></select></label>
          <label className="file-label">{t("Joindre des fichiers (plans, croquis…)")}<span><Paperclip/>{t("Choisir un fichier")}<input type="file" name="files" multiple accept=".pdf,.jpg,.jpeg,.png"/></span><small>{t("Formats : PDF, JPG, PNG (max 10 Mo)")}</small></label></div>
          <label>{t("Décrivez votre projet *")}<textarea name="message" required rows={3} placeholder={t("Décrivez votre projet")}/></label>
        </div>
        <Button type="submit" disabled={busy} className="quote-submit">{busy ? t("Envoi…") : t("Envoyer ma demande")}<ArrowRight/></Button>
        {status && <p role="status" className="quote-status">{t(status)}</p>}
      </form>
      <div className="contact-signature"><img src={villa} alt={t("Villa contemporaine — illustration")} loading="lazy" width={1024} height={640}/><div><h3><span>{t("Ensemble,")}</span><br/>{t("construisons")}<br/>{t("vos projets")}</h3><img src={logoUrl} alt={t("Sceau FATNASSI RACHID")} loading="lazy"/></div></div>
    </div>
  </section>;
}