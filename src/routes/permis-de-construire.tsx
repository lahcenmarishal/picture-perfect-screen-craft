import { useLanguage } from "@/components/LanguageProvider";
import { createFileRoute, Link } from "@tanstack/react-router";
import plans from "@/assets/plans.jpg";
import { PageHeader } from "@/components/SiteLayout";

export const Route = createFileRoute("/permis-de-construire")({
  head: () => ({
    meta: [
      { title: "Permis de construire au Maroc — Cabinet FATNASSI" },
      { name: "description", content: "Étapes et documents d'une demande d'autorisation de construire au Maroc, avec l'accompagnement du cabinet FATNASSI." },
      { property: "og:title", content: "Permis de construire au Maroc" },
      { property: "og:description", content: "Les étapes et documents pour votre autorisation de construire." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Permis,
});

const steps = [
  ["Vérification du terrain", "Propriété, situation cadastrale, règles d'urbanisme applicables."],
  ["Préparation du dossier", "Plans et pièces avec l'architecte et les professionnels concernés."],
  ["Dépôt de la demande", "Dépôt sur la plateforme dédiée (ROKHAS) ou auprès des services compétents."],
  ["Examen administratif et technique", "Réponse aux éventuelles demandes de compléments ou de modifications."],
  ["Obtention de l'autorisation", "Délivrance de l'autorisation, préalable au démarrage des travaux."],
] as const;

const docs = ["Justificatifs de propriété", "Plans architecturaux", "Pièces administratives et techniques", "Autres pièces selon la commune et le projet"];

function Permis() {
  const { t, t: translate } = useLanguage();
  return (
    <>
      <PageHeader eyebrow={t("Permis de construire")} title={t("Les étapes de votre autorisation de construire")}>{t("Les exigences varient selon la commune, le terrain et la nature du projet. Ces informations sont données à titre indicatif.")}</PageHeader>
      <section className="mx-auto grid max-w-7xl gap-14 px-5 py-20 lg:grid-cols-[1.3fr_1fr]">
        <ol className="space-y-8">
          {steps.map(([t, d], i) => (
            <li key={t} className="flex gap-6">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gold font-semibold text-primary-foreground">{i + 1}</span>
              <div><h2 className="text-2xl">{translate(t)}</h2><p className="mt-1 text-muted-foreground">{translate(d)}</p></div>
            </li>
          ))}
        </ol>
        <div className="space-y-8">
          <img src={plans} alt={t("Plans et maquette (illustration)")} loading="lazy" width={1200} height={912} />
          <div className="bg-paper p-8 text-paper-foreground">
            <h2 className="text-2xl">{t("Documents principaux")}</h2>
            <ul className="mt-4 space-y-2 text-sm">{docs.map((d) => <li key={translate(d)}>{t("•")}{translate(d)}</li>)}</ul>
          </div>
          <Link to="/contact" className="btn-gold">{t("Être accompagné dans mon dossier →")}</Link>
        </div>
      </section>
    </>
  );
}
