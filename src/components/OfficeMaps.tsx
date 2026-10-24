import { useLanguage } from "@/components/LanguageProvider";
import { contact } from "@/lib/site";

// Embeds Google Maps fournis par le propriétaire — à préserver tels quels.
export const officeMaps = [
  {
    label: "Maroc",
    caption: contact.city,
    src: "https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d2628.2847477787204!2d-7.678970924305236!3d33.54277297335309!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zMzPCsDMyJzM0LjAiTiA3wrA0MCczNS4wIlc!5e1!3m2!1sfr!2sma!4v1792638201313!5m2!1sfr!2sma",
  },
  {
    label: "France",
    caption: "41 La Grande Rue, 23170 Lépaud, France",
    src: "https://www.google.com/maps/embed?pb=!1m16!1m12!1m3!1d8723.656956922821!2d2.3736037023930114!3d46.24272292787563!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!2m1!1s41%20La%20Grande%20Rue%2023170%20Lepaud%20France!5e1!3m2!1sfr!2sma!4v1792857770705!5m2!1sfr!2sma",
  },
] as const;

export function OfficeMaps() {
  const { t } = useLanguage();
  return (
    <section className="office-maps">
      <div className="site-container">
        <p className="eyebrow">{t("Où nous trouver")}</p>
        <h2>{t("Nos localisations")}</h2>
        <div className="maps-grid">
          {officeMaps.map((m) => (
            <figure key={m.label} className="map-card">
              <iframe
                src={m.src}
                title={`${t(m.label)} — ${t("Localisation du cabinet")}`}
                loading="lazy"
                allowFullScreen
                referrerPolicy="strict-origin-when-cross-origin"
              />
              <figcaption dir="ltr">
                <strong>{t(m.label)}</strong>
                <span>{m.caption}</span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
