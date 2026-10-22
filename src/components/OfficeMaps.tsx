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
    caption: "6 Rue de la Tour, 23170 Lépaud, France",
    src: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2180.980734071086!2d2.3850055763166482!3d46.24105017109727!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47fa1cc06fc0aa85%3A0xb8009c1f8c2563f9!2s6%20Rue%20de%20la%20Tour%2C%2023170%20L%C3%A9paud%2C%20France!5e1!3m2!1sfr!2sma!4v1792638443125!5m2!1sfr!2sma",
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
