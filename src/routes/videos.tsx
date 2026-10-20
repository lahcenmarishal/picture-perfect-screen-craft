import { useLanguage } from "@/components/LanguageProvider";
import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHeader } from "@/components/SiteLayout";
import cabinetVideo from "@/assets/videos/cabinet.mp4";
import cabinetPoster from "@/assets/videos/cabinet-poster.jpg";
import permisVideo from "@/assets/videos/permis.mp4";
import permisPoster from "@/assets/videos/permis-poster.jpg";

export const Route = createFileRoute("/videos")({
  head: () => ({
    meta: [
      { title: "Vidéos — Cabinet d'architecture FATNASSI" },
      { name: "description", content: "Découvrez le cabinet FATNASSI en vidéo et les documents nécessaires pour une autorisation de construire au Maroc." },
      { property: "og:title", content: "Vidéos du cabinet FATNASSI" },
      { property: "og:description", content: "Présentation du cabinet et documents du permis de construire au Maroc." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Videos,
});

const videos = [
  { src: cabinetVideo, poster: cabinetPoster, title: "Découvrez le cabinet d'architecture FATNASSI", text: "Une présentation du cabinet et de son accompagnement, de la conception à la réalisation." },
  { src: permisVideo, poster: permisPoster, title: "Les documents du permis de construire au Maroc", text: "Les pièces à préparer pour votre demande d'autorisation de construire." },
];

function Videos() {
  const { t } = useLanguage();
  return (
    <>
      <PageHeader eyebrow="Vidéos" title="Le cabinet en vidéo">{t("Présentation du cabinet et conseils pratiques pour vos démarches.")}</PageHeader>
      <section className="mx-auto grid max-w-5xl gap-14 px-5 py-20 md:grid-cols-2">
        {videos.map((v) => (
          <article key={v.title} className="flex flex-col gap-5">
            <h2 className="video-title">{t(v.title)}</h2>
            <video controls preload="none" playsInline poster={v.poster} className="aspect-[9/16] w-full border border-border bg-ink object-contain">
              <source src={v.src} type="video/mp4" />
            </video>
            <p className="text-muted-foreground">{t(v.text)}</p>
          </article>
        ))}
      </section>
      <div className="mx-auto max-w-5xl px-5 pb-20"><Link to="/contact" className="btn-gold">{t("Demander un devis →")}</Link></div>
    </>
  );
}
