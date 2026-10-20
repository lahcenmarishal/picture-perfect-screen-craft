import { useLanguage, languages } from "@/components/LanguageProvider";
import { Flag } from "@/components/Flag";
import { Link } from "@tanstack/react-router";
import { useState, type ReactNode } from "react";
import { logoUrl } from "@/lib/brand-assets";
import { contact, nav } from "@/lib/site";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";

function LanguageSwitch() {
  const { language, setLanguage } = useLanguage();
  return <div className="language-switch" role="group" aria-label="Langue / Language" dir="ltr">
    {languages.map((l) => (
      <Button key={l.code} variant="ghost" size="sm" aria-pressed={language === l.code} aria-label={l.label} title={l.label} onClick={() => setLanguage(l.code)}>
        <Flag code={l.flag} />
      </Button>
    ))}
  </div>;
}

export function Header() {
  const { t } = useLanguage();
  const [open, setOpen] = useState(false);
  return (
    <header className="site-header">
      <div className="site-container header-inner">
        <Link to="/" className="brand">
          <img src={logoUrl} alt={t("Logo FATNASSI RACHID Architecte DPLG")} />
          <span className="leading-tight">
            <span className="brand-name">{t("FATNASSI RACHID")}</span>
            <span className="brand-subtitle">{t("ARCHITECTE DPLG")}</span>
          </span>
        </Link>
        <nav className="desktop-navigation" aria-label={t("Navigation principale")}>
          {nav.map((n) => (
            <Link key={n.to} to={n.to} activeProps={{ className: "nav-active" }} activeOptions={{ exact: true }}>
              {t(n.label)}
            </Link>
          ))}
        </nav>
        <div className="header-actions">
          <Button asChild variant="outline" className="header-quote"><Link to="/contact">{t("Demande de devis")}</Link></Button>
        </div>
        <LanguageSwitch />
        <Button variant="ghost" size="icon" className="mobile-menu-button" aria-label={t("Menu")} aria-expanded={open} onClick={() => setOpen(!open)}>{open ? <X/> : <Menu/>}</Button>
      </div>
      {open && (
        <nav className="border-t border-border bg-ink px-5 py-4 lg:hidden">
          {nav.map((n) => (
            <Link key={n.to} to={n.to} onClick={() => setOpen(false)} className="block py-2 text-foreground/85 hover:text-gold">
              {t(n.label)}
            </Link>
          ))}
          <Link to="/contact" onClick={() => setOpen(false)} className="btn-gold mt-3">{t("Demande de devis")}</Link>
        </nav>
      )}
    </header>
  );
}

export function Footer() {
  const { t } = useLanguage();
  return (
    <footer className="site-footer">
      <div className="site-container footer-top">
        <Link to="/" className="brand footer-brand"><img src={logoUrl} alt="" loading="lazy"/><span><span className="brand-name">{t("FATNASSI RACHID")}</span><span className="brand-subtitle">{t("ARCHITECTE DPLG")}</span></span></Link>
        <ul className="footer-nav">
          {nav.map((n) => (
            <li key={n.to}><Link to={n.to} className="text-foreground/75 hover:text-gold">{t(n.label)}</Link></li>
          ))}
        </ul>
        <p className="footer-location">{t(contact.city)}</p>
      </div>
      <p className="footer-copyright">
        © {new Date().getFullYear()}{t("Cabinet d'architecture FATNASSI. Tous droits réservés.")}</p>
    </footer>
  );
}

export function PageHeader({ eyebrow, title, children }: { eyebrow: string; title: string; children?: ReactNode }) {
  const { t } = useLanguage();
  return (
    <section className="border-b border-border bg-ink">
      <div className="mx-auto max-w-7xl px-5 py-20 fade-up">
        <p className="eyebrow">{t(eyebrow)}</p>
        <h1 className="mt-4 max-w-3xl text-5xl md:text-6xl">{t(title)}</h1>
        {children && <div className="mt-6 max-w-2xl text-muted-foreground">{children}</div>}
      </div>
    </section>
  );
}

export function CtaBand() {
  const { t } = useLanguage();
  return (
    <section className="bg-card">
      <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-6 px-5 py-16 md:flex-row md:items-center">
        <h2 className="text-4xl">{t("Ensemble,")}{" "}<span className="text-gold italic">{t("construisons")}</span>{" "}{t("vos projets.")}</h2>
        <Link to="/contact" className="btn-gold">{t("Demander un devis →")}</Link>
      </div>
    </section>
  );
}
