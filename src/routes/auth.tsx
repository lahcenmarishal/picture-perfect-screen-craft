import { useLanguage } from "@/components/LanguageProvider";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export const Route = createFileRoute("/auth")({
  head: () => ({
    meta: [
      { title: "Connexion administrateur — Cabinet FATNASSI" },
      { name: "description", content: "Accès réservé à l'administration du cabinet FATNASSI." },
      { property: "og:title", content: "Connexion administrateur" },
      { property: "og:description", content: "Accès réservé à l'administration." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: AuthPage,
});

function AuthPage() {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    setLoading(false);
    if (error) return setError("Identifiants incorrects.");
    navigate({ to: "/admin" });
  }

  return (
    <section className="mx-auto max-w-md px-5 py-24">
      <h1 className="text-3xl">{t("Espace administrateur")}</h1>
      <p className="mt-2 text-sm text-muted-foreground">{t("Accès réservé. Aucune création de compte n'est possible.")}</p>
      <form onSubmit={onSubmit} className="mt-8 space-y-4">
        <div className="space-y-2"><Label htmlFor="email">{t("E-mail")}</Label>
          <Input id="email" type="email" required value={email} onChange={(e) => setEmail(e.target.value)} /></div>
        <div className="space-y-2"><Label htmlFor="password">{t("Mot de passe")}</Label>
          <Input id="password" type="password" required value={password} onChange={(e) => setPassword(e.target.value)} /></div>
        {error && <p className="text-sm text-destructive">{t(error)}</p>}
        <Button type="submit" disabled={loading} className="w-full">{loading ? t("Connexion…") : t("Se connecter")}</Button>
      </form>
    </section>
  );
}
