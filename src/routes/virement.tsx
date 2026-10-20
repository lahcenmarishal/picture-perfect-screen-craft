import { useLanguage } from "@/components/LanguageProvider";
import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { PageHeader } from "@/components/SiteLayout";
import { Button } from "@/components/ui/button";
import { Copy, Check, Landmark, Globe2 } from "lucide-react";
import moyens from "@/assets/moyens-transfert.jpg";

export const Route = createFileRoute("/virement")({
  head: () => ({
    meta: [
      { title: "Paiement par virement — Cabinet FATNASSI" },
      { name: "description", content: "Coordonnées bancaires CIH Bank du cabinet FATNASSI et moyens de transfert d'argent disponibles depuis le Maroc et l'étranger." },
      { property: "og:title", content: "Paiement par virement — FATNASSI" },
      { property: "og:description", content: "RIB, IBAN, SWIFT et services de transfert d'argent acceptés." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Virement,
});

const bank = [
  ["Titulaire", "MONSIEUR RACHID FATNASSI"],
  ["Banque", "CIH Bank"],
  ["Numéro de compte", "2473110211002800"],
  ["RIB", "230 780 2473110211002800 69"],
  ["IBAN", "MA64 2307 8024 7311 0211 0028 0069"],
  ["Code SWIFT", "CIHMMAMC"],
] as const;

function CopyButton({ value }: { value: string }) {
  const { t } = useLanguage();
  const [done, setDone] = useState(false);
  return <Button variant="ghost" size="icon" aria-label={t("Copier")} onClick={() => { navigator.clipboard?.writeText(value); setDone(true); setTimeout(() => setDone(false), 1500); }}>{done ? <Check /> : <Copy />}</Button>;
}

function Virement() {
  const { t } = useLanguage();
  return (
    <>
      <PageHeader eyebrow="Paiement" title="Virement direct">{t("Réglez vos honoraires par virement bancaire ou par un service de transfert d'argent, depuis le Maroc ou l'étranger.")}</PageHeader>
      <section className="mx-auto grid max-w-7xl gap-14 px-5 py-20 lg:grid-cols-2">
        <div className="bg-paper p-8 text-paper-foreground">
          <div className="flex items-center gap-3"><Landmark className="text-gold" /><h2 className="text-3xl">{t("Coordonnées bancaires")}</h2></div>
          <dl className="mt-6 divide-y divide-border/40">
            {bank.map(([label, value]) => (
              <div key={label} className="flex items-center justify-between gap-4 py-3">
                <div><dt className="text-xs uppercase tracking-widest opacity-70">{t(label)}</dt><dd className="mt-1 font-semibold" dir="ltr">{value}</dd></div>
                {label !== "Banque" && label !== "Titulaire" && <CopyButton value={value.replace(/\s/g, "")} />}
              </div>
            ))}
          </dl>
          <p className="mt-6 text-sm opacity-80">{t("Merci d'indiquer votre nom et la référence de votre projet dans le motif du virement.")}</p>
        </div>
        <div>
          <div className="flex items-center gap-3"><Globe2 className="text-gold" /><h2 className="text-3xl">{t("Transfert d'argent")}</h2></div>
          <p className="mt-4 text-muted-foreground">{t("Depuis l'étranger, vous pouvez aussi passer par une agence ou une application de transfert d'argent (Western Union, MoneyGram, Ria, Remitly…) au nom de Monsieur Rachid Fatnassi, ou par virement depuis votre carte bancaire.")}</p>
          <img src={moyens} alt={t("Services de transfert d'argent : Western Union, MoneyGram, Ria, Remitly, WorldRemit et autres")} loading="lazy" className="mt-6 w-full rounded-sm" />
        </div>
      </section>
    </>
  );
}
