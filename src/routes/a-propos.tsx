import { useLanguage } from "@/components/LanguageProvider";
import { createFileRoute } from "@tanstack/react-router";
import { architecteUrl } from "@/lib/brand-assets";
import { PageHeader, CtaBand } from "@/components/SiteLayout";

export const Route = createFileRoute("/a-propos")({
  head: () => ({
    meta: [
      { title: "À propos — Rachid Fatnassi, Architecte DPLG" },
      { name: "description", content: "Découvrez le cabinet d'architecture FATNASSI RACHID à Casablanca et son approche." },
      { property: "og:title", content: "À propos du cabinet FATNASSI" },
      { property: "og:description", content: "Rachid Fatnassi, Architecte DPLG à Casablanca." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: About,
});

const values = [
  ["Écoute", "Comprendre vos besoins, votre terrain et vos contraintes avant de dessiner."],
  ["Rigueur", "Des plans précis et des dossiers conformes aux règles en vigueur."],
  ["Accompagnement", "Un interlocuteur unique, de la conception à la réalisation."],
] as const;

function About() {
  const { t, t: translate } = useLanguage();
  return (
    <>
      <PageHeader eyebrow={t("À propos")} title={t("Un cabinet d'architecture au service de vos projets")} />
      <section className="mx-auto grid max-w-7xl gap-14 px-5 py-24 lg:grid-cols-2">
        <img src={architecteUrl} alt={t("Rachid Fatnassi, architecte DPLG")} className="aspect-[4/5] w-full object-cover object-[45%_center]" loading="lazy" />
        <div>
          <h2 className="text-5xl">{t("Rachid Fatnassi")}</h2>
          <p className="mt-2 text-gold">{t("Architecte DPLG — Casablanca")}</p>
          <p className="mt-8 leading-relaxed text-muted-foreground">{t("Le cabinet FATNASSI RACHID accompagne particuliers, promoteurs et entreprises dans la conception et la réalisation de leurs projets : villas, immeubles résidentiels et bâtiments industriels.")}</p>
          <p className="mt-4 leading-relaxed text-muted-foreground">{t("Notre approche allie technicité, créativité et respect des normes, avec un accompagnement complet dans les démarches administratives.")}</p>
          <div className="mt-12 space-y-8">
            {values.map(([t, d]) => (
              <div key={t} className="border-l border-gold pl-6">
                <h3 className="text-2xl">{translate(t)}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{translate(d)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <CtaBand />
    </>
  );
}
