import { useLanguage } from "@/components/LanguageProvider";
import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { services } from "@/lib/site";
import { PageHeader, CtaBand } from "@/components/SiteLayout";

export const Route = createFileRoute("/services/$slug")({
  loader: ({ params }) => {
    const service = services.find((s) => s.slug === params.slug);
    if (!service) throw notFound();
    return { service };
  },
  head: ({ loaderData }) => ({
    meta: loaderData
      ? [
          { title: `${loaderData.service.title} — Cabinet FATNASSI` },
          { name: "description", content: loaderData.service.intro },
          { property: "og:title", content: loaderData.service.title },
          { property: "og:description", content: loaderData.service.intro },
          { property: "og:type", content: "website" },
          { name: "twitter:card", content: "summary_large_image" },
        ]
      : [{ title: "Service introuvable" }, { name: "robots", content: "noindex" }],
  }),
  component: ServicePage,
});

function ServicePage() {
  const { t } = useLanguage();
  const { service } = Route.useLoaderData();
  return (
    <>
      <PageHeader eyebrow={t("Service")} title={t(service.title)}>{t(service.intro)}</PageHeader>
      <section className="mx-auto grid max-w-7xl gap-12 px-5 py-20 lg:grid-cols-2">
        <div>
          <h2 className="text-4xl">{t("Ce que comprend la prestation")}</h2>
          <ul className="mt-8 space-y-4">
            {service.points.map((p) => (
              <li key={t(p)} className="flex gap-4 border-b border-border pb-4"><span className="text-gold">—</span>{t(p)}</li>
            ))}
          </ul>
        </div>
        <div className="bg-card p-10">
          <h3 className="text-3xl">{t("Parlons de votre projet")}</h3>
          <p className="mt-4 text-muted-foreground">{t("Décrivez-nous votre besoin, nous revenons vers vous rapidement.")}</p>
          <Link to="/contact" className="btn-gold mt-8">{t("Demander un devis →")}</Link>
          <Link to="/services" className="mt-6 block text-sm text-muted-foreground hover:text-gold">{t("← Tous les services")}</Link>
        </div>
      </section>
      <CtaBand />
    </>
  );
}
