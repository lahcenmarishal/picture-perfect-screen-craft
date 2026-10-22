import { useLanguage, languages } from "@/components/LanguageProvider";
import { Flag } from "@/components/Flag";
import { Link } from "@tanstack/react-router";
import { useState, type ReactNode } from "react";
import { logoUrl } from "@/lib/brand-assets";
import { contact, nav } from "@/lib/site";
import { Button } from "@/components/ui/button";
import { Menu, Phone, Mail, X } from "lucide-react";

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

export function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" fill="currentColor" className={className}>
      <path d="M12.04 2c-5.5 0-9.98 4.47-9.98 9.97 0 1.76.46 3.49 1.33 5L2 22l5.15-1.35a9.95 9.95 0 0 0 4.88 1.27h.01c5.5 0 9.97-4.47 9.98-9.97a9.9 9.9 0 0 0-2.92-7.04A9.9 9.9 0 0 0 12.04 2Zm0 18.22h-.01a8.28 8.28 0 0 1-4.22-1.16l-.3-.18-3.06.8.82-2.98-.2-.31a8.25 8.25 0 0 1-1.27-4.42c0-4.59 3.74-8.32 8.33-8.32a8.26 8.26 0 0 1 5.88 2.44 8.27 8.27 0 0 1 2.44 5.89c0 4.59-3.74 8.33-8.32 8.33Zm4.57-6.24c-.25-.13-1.48-.73-1.71-.81-.23-.09-.4-.13-.57.13-.17.25-.65.81-.8.98-.15.17-.3.19-.55.06-.25-.13-1.06-.39-2.02-1.25-.75-.67-1.26-1.49-1.41-1.74-.15-.25-.02-.39.11-.52.11-.11.25-.3.38-.44.13-.15.17-.25.25-.42.08-.17.04-.32-.02-.44-.06-.13-.57-1.38-.78-1.89-.2-.5-.41-.43-.57-.44h-.49c-.17 0-.44.06-.67.32-.23.25-.88.86-.88 2.1 0 1.24.9 2.44 1.03 2.61.13.17 1.77 2.71 4.29 3.8.6.26 1.07.42 1.44.53.61.19 1.17.16 1.61.1.49-.07 1.48-.61 1.69-1.2.21-.59.21-1.09.15-1.2-.06-.11-.23-.17-.48-.3Z" />
    </svg>
  );
}

export function OfficeContactLinks() {
  const { t } = useLanguage();
  return (
    <div className="office-contact-links">
      <Button asChild variant="outline">
        <a href={contact.phoneHref} dir="ltr" aria-label={`${t("Téléphone")} ${contact.phone}`}>
          <Phone aria-hidden="true" />
          <span>{contact.phone}</span>
        </a>
      </Button>
      <Button asChild variant="outline">
        <a href={`https://wa.me/${contact.whatsapp}`} target="_blank" rel="noreferrer" dir="ltr" aria-label={`WhatsApp ${contact.phone}`}>
          <WhatsAppIcon />
          <span>{t("WhatsApp")}</span>
          <span>{contact.phone}</span>
        </a>
      </Button>
      <Button asChild variant="outline">
        <a href={`mailto:${contact.email}`} dir="ltr" aria-label={`${t("E-mail")} ${contact.email}`}>
          <Mail aria-hidden="true" />
          <span>{contact.email}</span>
        </a>
      </Button>
    </div>
  );
}

export function FloatingWhatsApp() {
  const { t } = useLanguage();
  return (
    <a className="floating-whatsapp" href={`https://wa.me/${contact.whatsapp}`} target="_blank" rel="noreferrer" aria-label={`WhatsApp ${contact.phone}`} title={t("WhatsApp")}>
      <WhatsAppIcon />
    </a>
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
