import { useLanguage } from "@/components/LanguageProvider";
import { createFileRoute, Link } from "@tanstack/react-router";
import { services } from "@/lib/site";
import { PageHeader, CtaBand } from "@/components/SiteLayout";

export const Route = createFileRoute("/services/")({
  head: () => ({
    meta: [
      { title: "Services — Cabinet d'architecture FATNASSI" },
      { name: "description", content: "Conception, plans, autorisations de construire, dossiers administratifs et suivi de chantier." },
      { property: "og:title", content: "Nos services d'architecture" },
      { property: "og:description", content: "Toutes les prestations du cabinet FATNASSI à Casablanca." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Services,
});

function Services() {
  const { t } = useLanguage();
  return (
    <>
      <PageHeader eyebrow={t("Nos services")} title={t("Des solutions complètes, de la conception à la livraison")} />
      <section className="mx-auto grid max-w-7xl gap-px bg-border px-0 md:grid-cols-2 lg:grid-cols-3">
        {services.map((s, i) => (
          <Link key={s.slug} to="/services/$slug" params={{ slug: s.slug }} className="group bg-background p-10 transition-colors hover:bg-card">
            <span className="font-display text-4xl text-gold">0{i + 1}</span>
            <h2 className="mt-6 text-3xl">{t(s.title)}</h2>
            <p className="mt-3 text-sm text-muted-foreground">{t(s.intro)}</p>
            <span className="mt-6 inline-block text-sm text-gold">{t("Voir le détail →")}</span>
          </Link>
        ))}
      </section>
      <CtaBand />
    </>
  );
}
