import { useLanguage } from "@/components/LanguageProvider";
import { createFileRoute, Link } from "@tanstack/react-router";
import hero from "@/assets/hero-villa.jpg";
import plans from "@/assets/plans.jpg";
import { architecteUrl, logoUrl } from "@/lib/brand-assets";
import architecteIllustration from "@/assets/architecte-autorisations.png";
import { Flag } from "@/components/Flag";
import { services } from "@/lib/site";
import { useState } from "react";
import { Building2, DraftingCompass, ClipboardList, Files, SearchCheck, Network, CalendarDays, MapPin, Users, FileText, ArrowRight, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { HomeContact, ProjectGallery } from "@/components/HomeShowcase";
import { OfficeMaps } from "@/components/OfficeMaps";
import { HomeVideos, HomeVirement } from "@/components/HomeExtras";
import garden from "@/assets/villa-garden.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "FATNASSI RACHID — Cabinet d'architecture à Casablanca" },
      { name: "description", content: "Votre projet, notre expertise : conception architecturale, plans, permis de construire et suivi de chantier à Casablanca et au Maroc." },
      { property: "og:title", content: "FATNASSI RACHID — Architecte DPLG" },
      { property: "og:description", content: "Conception, autorisations et suivi de vos projets architecturaux à Casablanca." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  const { t } = useLanguage();
  const [slide, setSlide] = useState(0);
  const slides = [hero, garden, hero];
  const icons = [Building2, DraftingCompass, ClipboardList, Files, SearchCheck, Network];
  const titles = ["Conception architecturale", "Plans architecturaux", "Permis de construire", "Dossiers administratifs", "Suivi de chantier", "Autres prestations"];
  const steps = [
    ["Vérification du terrain", "Propriété, situation cadastrale, règles d’urbanisme"],
    ["Préparation du dossier", "Avec l’architecte et les professionnels concernés"],
    ["Dépôt de la demande", "Sur la plateforme ROKHAS"],
    ["Examen administratif et technique", "Réponse aux éventuelles demandes de modification"],
    ["Obtention de l’autorisation", "Avant le début des travaux"],
  ] as const;
  return (
    <div className="home-page">
      <section className="home-hero">
        <img src={slides[slide]} alt={t("Villa contemporaine avec piscine à Casablanca — illustration")} width={1920} height={1088} className="hero-image"/>
        <div className="hero-shade absolute inset-0"/>
        <div className="site-container hero-content fade-up"><p className="eyebrow">{t("Cabinet d’architecture Fatnassi")}</p>
          <h1>{t("Votre projet,")}<br/>{t("notre")}{" "}<span className="text-gold">{t("expertise")}</span></h1>
          <p className="hero-description">{t("Le cabinet d’architecture FATNASSI vous accompagne dans la conception, la réalisation et le suivi de vos projets architecturaux à Casablanca et partout en France, en Espagne, en Italie et au Maroc.")}</p>
          <div className="hero-actions"><Button asChild><Link to="/services">{t("Découvrir nos services")}<ArrowRight/></Link></Button><Button asChild variant="outline"><Link to="/contact">{t("Nous contacter")}</Link></Button></div>
        </div>
        <p className="hero-motto">{t("Des espaces pensés")}<br/>{t("pour aujourd’hui")}<br/>{t("et pour demain")}</p>
        <div className="hero-pagination">{[0,1,2].map(i => <Button variant="ghost" key={i} onClick={() => setSlide(i)} aria-label={`${t("Afficher la vue")} ${i+1}`} aria-pressed={slide === i} className={slide === i ? "text-gold" : "text-muted-foreground"}>0{i+1}</Button>)}<Button variant="ghost" size="icon" aria-label={t("Vue suivante")} onClick={() => setSlide((slide+1)%3)}><ChevronRight/></Button></div>
      </section>
      <section className="home-services site-container"><div className="services-intro"><p className="eyebrow">{t("Nos services")}</p><h2>{t("Des solutions complètes")}<br/>{t("pour tous vos projets")}</h2><p>{t("Nous mettons notre savoir-faire et notre expérience à votre service pour concrétiser vos idées, de la conception à la livraison.")}</p><Button asChild variant="outline"><Link to="/services">{t("Voir tous les services")}<ArrowRight/></Link></Button></div>
        <div className="services-grid">{services.map((s,i) => { const Icon = icons[i]; return <Link key={s.slug} to="/services/$slug" params={{slug:s.slug}} className="service-cell">{Icon && <Icon/>}<h3>{t(titles[i] ?? "")}</h3><p>{t(i === 5 ? "Conseil, expertise, assistance…" : s.short)}</p></Link>; })}</div>
      </section>
      <section className="home-about"><div className="site-container about-layout"><div className="architect-portrait"><img src={architecteUrl} alt={t("Portrait de FATNASSI Rachid, architecte DPLG")} className="architect-photo" loading="lazy"/></div>
        <div className="about-copy"><p className="eyebrow">{t("À propos du cabinet")}</p><h2>{t("FATNASSI Rachid")}</h2><h3>{t("L'architecte principal : Le cabinet d'architecture FATNASSI est dirigé par FATNASSI Rachid, Architecte DPLG diplome de l'Ecole d'Architecture Paris-Val-de-Seine ( ex Paris-Malaquais UP 1 )")}</h3><p>{t("Le cabinet FATNASSI met son expertise au service de vos projets architecturaux, alliant technicité, créativité et respect des normes en vigueur.")}</p><div className="about-facts"><div><CalendarDays/><span><strong>{t("Une expertise reconnue")}</strong><small>{t("Au service de vos projets")}</small></span></div><div><MapPin/><span><strong>{t("Casablanca")}</strong><small>{t("Notre cabinet")}</small></span></div><div><Users/><span><strong>{t("Un accompagnement")}</strong><small>{t("De la conception à la réalisation")}</small></span></div></div></div>
        <Link to="/a-propos" className="about-seal"><img src={logoUrl} alt={t("Découvrir le cabinet FATNASSI RACHID")} loading="lazy"/></Link>
      </div></section>
      <section className="home-credentials"><div className="site-container credentials-layout">
        <div className="credentials-visual"><img src={architecteIllustration} alt={t("L’architecte au travail, au sein du cabinet")} loading="lazy" width={1254} height={1254}/></div>
        <div className="credentials-copy"><p className="eyebrow">{t("Autorisations d’exercice")}</p>
          <h2>{t("Un architecte autorisé")}<br/>{t("dans plusieurs pays")}</h2>
          <ul className="credentials-list">
            <li><Flag code="ma" size={24}/><p>{t("MAROC : autorisé à exercer sous le n° 2145 du 24/11/2000")}</p></li>
            <li><Flag code="fr" size={24}/><p>{t("FRANCE : autorisé à exercer sous le n° 090928 du 27/01/2025")}</p></li>
            <li><Flag code="es" size={24}/><Flag code="it" size={24}/><p>{t("ESPAGNE & ITALIE : autorisations en cours")}</p></li>
          </ul>
        </div>
      </div></section>
      <ProjectGallery/>
      <section className="home-permit"><div className="permit-layout"><img src={plans} alt={t("Plans et maquette architecturale — illustration")} width={1200} height={912} loading="lazy" className="permit-photo"/><div className="permit-copy"><p className="eyebrow">{t("Permis de construire")}</p><h2>{t("Les étapes et documents")}<br/>{t("pour votre autorisation")}</h2><p>{t("L’obtention d’un permis de construire au Maroc passe par plusieurs étapes et nécessite un dossier complet. Les pièces et les exigences varient selon la commune, le terrain et le type de construction.")}</p><Button asChild variant="outline"><Link to="/permis-de-construire">{t("En savoir plus")}<ArrowRight/></Link></Button></div>
        <ol className="permit-steps">{steps.map(([title,desc],i) => <li key={t(title)}><span>{i+1}</span><div><strong>{t(title)}</strong><p>{t(desc)}</p></div></li>)}</ol>
        <div className="permit-documents"><FileText/><h3>{t("Documents principaux")}</h3><ul><li>{t("Justificatifs de propriété")}</li><li>{t("Plans architecturaux")}</li><li>{t("Pièces administratives et techniques")}</li><li>{t("Selon la commune et le projet")}</li></ul><Button asChild variant="outline"><Link to="/permis-de-construire">{t("Voir les détails")}<ArrowRight/></Link></Button></div>
      </div></section>
      <HomeVideos/>
      <HomeVirement/>
      <HomeContact/>
      <OfficeMaps/>
    </div>
  );
}
