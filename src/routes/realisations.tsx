import { useLanguage } from "@/components/LanguageProvider";
import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { fetchProjects, fetchProjectImages, type ProjectRow, type ProjectImageRow } from "@/lib/projects";
import { PageHeader } from "@/components/SiteLayout";

export const Route = createFileRoute("/realisations")({
  head: () => ({
    meta: [
      { title: "Réalisations — Cabinet FATNASSI Architecte" },
      { name: "description", content: "Villas, résidentiel, industriel : les projets du cabinet FATNASSI à Casablanca." },
      { property: "og:title", content: "Nos réalisations" },
      { property: "og:description", content: "Les projets du cabinet d'architecture FATNASSI." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Realisations,
});

const cats = ["Tous", "Villas", "Résidentiel", "Industriel", "Autres"];

function Realisations() {
  const { t } = useLanguage();
  const [cat, setCat] = useState("Tous");
  const [projects, setProjects] = useState<ProjectRow[] | null>(null);
  useEffect(() => { fetchProjects().then(setProjects).catch(() => setProjects([])); }, []);
  const shown = (projects ?? []).filter((p) => cat === "Tous" || p.category === cat);
  return (
    <>
      <PageHeader eyebrow={t("Portfolio")} title={t("Nos réalisations")}>{t("Une sélection de projets qui reflètent notre savoir-faire.")}</PageHeader>
      <section className="mx-auto max-w-7xl px-5 py-16">
        <div className="flex flex-wrap gap-6 border-b border-border pb-4 text-sm" role="tablist">
          {cats.map((c) => (
            <button key={t(c)} role="tab" aria-selected={cat === c} onClick={() => setCat(c)}
              className={cat === c ? "text-gold" : "text-muted-foreground hover:text-foreground"}>{t(c)}</button>
          ))}
        </div>
        {projects && projects.length > 0 ? (
          <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {shown.map((p) => (
              <ProjectCardPublic key={p.id} project={p} />
            ))}
            {!shown.length && <p className="text-muted-foreground">{t("Aucun projet dans cette catégorie pour le moment.")}</p>}
          </div>
        ) : projects ? (
          <div className="mt-16 border border-dashed border-gold/40 p-14 text-center">
            <h2 className="text-3xl">{t("Galerie en cours de préparation")}</h2>
            <p className="mx-auto mt-4 max-w-lg text-muted-foreground">{t("Les photos des projets réels du cabinet seront publiées ici prochainement.")}</p>
            <Link to="/contact" className="btn-outline-gold mt-8">{t("Discuter de votre projet")}</Link>
          </div>
        ) : null}
      </section>
    </>
  );
}

function ProjectCardPublic({ project: p }: { project: ProjectRow }) {
  const { t } = useLanguage();
  const [gallery, setGallery] = useState<ProjectImageRow[]>([]);
  const [open, setOpen] = useState(false);
  useEffect(() => { fetchProjectImages(p.id).then(setGallery).catch(() => setGallery([])); }, [p.id]);
  return (
    <article className="border border-border">
      {p.image_url && <img src={p.image_url} alt={p.title} loading="lazy" className="aspect-[4/3] w-full object-cover" />}
      <div className="p-5">
        <span className="text-xs uppercase tracking-wider text-gold">{t(p.category)}</span>
        <h2 className="mt-2 text-xl">{p.title}</h2>
        {p.location && <p className="mt-1 text-sm text-muted-foreground">{p.location}</p>}
        {p.description && <p className="mt-3 text-sm text-muted-foreground">{p.description}</p>}
        {gallery.length > 0 && (
          <button onClick={() => setOpen(!open)} className="mt-4 text-sm text-gold underline underline-offset-4">
            {open ? t("Masquer la galerie") : `${t("Voir la galerie")} (${gallery.length} ${t("photos")})`}
          </button>
        )}
      </div>
      {open && gallery.length > 0 && (
        <div className="grid grid-cols-2 gap-2 border-t border-border p-3">
          {gallery.map((img) => img.image_url && (
            <img key={img.id} src={img.image_url} alt={`${p.title} — ${t("Photo")}`} loading="lazy" className="aspect-square w-full object-cover" />
          ))}
        </div>
      )}
    </article>
  );
}
