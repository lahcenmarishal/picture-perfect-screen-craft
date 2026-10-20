import { useLanguage } from "@/components/LanguageProvider";
import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowRight, Check, Copy, Globe2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import cabinetVideo from "@/assets/videos/cabinet.mp4";
import cabinetPoster from "@/assets/videos/cabinet-poster.jpg";
import permisVideo from "@/assets/videos/permis.mp4";
import permisPoster from "@/assets/videos/permis-poster.jpg";
import moyens from "@/assets/moyens-transfert.jpg";

const homeVideos = [
  { src: cabinetVideo, poster: cabinetPoster, title: "Découvrez le cabinet d'architecture FATNASSI" },
  { src: permisVideo, poster: permisPoster, title: "Les documents du permis de construire au Maroc" },
] as const;

const bank = [
  ["Numéro de compte", "2473110211002800"],
  ["RIB", "230 780 2473110211002800 69"],
  ["IBAN", "MA64 2307 8024 7311 0211 0028 0069"],
  ["Code SWIFT", "CIHMMAMC"],
] as const;

function CopyValue({ value }: { value: string }) {
  const { t } = useLanguage();
  const [done, setDone] = useState(false);
  return <Button variant="ghost" size="icon" aria-label={t("Copier")} onClick={() => { navigator.clipboard?.writeText(value); setDone(true); setTimeout(() => setDone(false), 1500); }}>{done ? <Check /> : <Copy />}</Button>;
}

export function HomeVideos() {
  const { t } = useLanguage();
  return <section className="home-videos site-container">
    <div className="videos-intro"><p className="eyebrow">{t("Vidéos")}</p><h2>{t("Le cabinet en vidéo")}</h2>
      <Button asChild variant="outline"><Link to="/videos">{t("Voir toutes les vidéos")}<ArrowRight/></Link></Button></div>
    <div className="videos-grid">{homeVideos.map(v => <figure key={v.title}>
      <figcaption><h3 className="video-title">{t(v.title)}</h3></figcaption>
      <video controls preload="none" playsInline poster={v.poster}><source src={v.src} type="video/mp4" /></video>
    </figure>)}</div>
  </section>;
}

export function HomeVirement() {
  const { t } = useLanguage();
  return <section className="home-virement">
    <div className="virement-layout">
      <div className="virement-copy">
        <p className="eyebrow">{t("Paiement")}</p>
        <h2>{t("Virement direct")}</h2>
        <p>{t("Réglez vos honoraires par virement bancaire ou par un service de transfert d'argent, depuis le Maroc ou l'étranger.")}</p>
        <dl className="virement-bank">
          {bank.map(([label, value]) => <div key={label}><div><dt>{t(label)}</dt><dd dir="ltr">{value}</dd></div><CopyValue value={value.replace(/\s/g, "")} /></div>)}
        </dl>
        <p className="virement-note">{t("Coordonnées au nom de Monsieur Rachid Fatnassi — CIH Bank.")}</p>
        <Button asChild variant="outline"><Link to="/virement">{t("Tous les moyens de paiement")}<ArrowRight/></Link></Button>
      </div>
      <div className="virement-media">
        <div className="virement-transfer"><Globe2 /><p>{t("Depuis l'étranger, vous pouvez aussi passer par une agence ou une application de transfert d'argent (Western Union, MoneyGram, Ria, Remitly…) au nom de Monsieur Rachid Fatnassi, ou par virement depuis votre carte bancaire.")}</p></div>
        <img src={moyens} alt={t("Services de transfert d'argent : Western Union, MoneyGram, Ria, Remitly, WorldRemit et autres")} loading="lazy" />
      </div>
    </div>
  </section>;
}
