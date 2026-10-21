import { fireEvent, render, screen, waitFor, cleanup } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it } from "vitest";
import { LanguageProvider, useLanguage, languages } from "@/components/LanguageProvider";
import ar from "@/lib/translations-ar.json";
import en from "@/lib/translations-en.json";
import es from "@/lib/translations-es.json";
import it from "@/lib/translations-it.json";
import zgh from "@/lib/translations-zgh.json";

const architectDescription = "L'architecte principal : Le cabinet d'architecture FATNASSI est dirigé par FATNASSI Rachid, Architecte DPLG diplome de l'Ecole d'Architecture Paris-Val-de-Seine ( ex Paris-Malaquais UP 1 )";
const internationalDescription = "Le cabinet d’architecture FATNASSI vous accompagne dans la conception, la réalisation et le suivi de vos projets architecturaux à Casablanca et partout en France, en Espagne, en Italie et au Maroc.";

function LanguageProbe() {
  const { language, setLanguage } = useLanguage();
  return <><output data-testid="language">{language}</output><button onClick={() => setLanguage("zgh")}>Choose Tamazight</button><button onClick={() => setLanguage("fr")}>Choose French</button></>;
}

beforeEach(() => localStorage.clear());
afterEach(cleanup);

describe("Moroccan Tamazight selection", () => {
  it("associates Moroccan Tamazight with the Amazigh flag", () => {
    expect(languages.find(({ code }) => code === "zgh")?.flag).toBe("amz");
  });

  it("persists Tamazight and uses left-to-right document direction", async () => {
    render(<LanguageProvider><LanguageProbe /></LanguageProvider>);
    fireEvent.click(screen.getByText("Choose Tamazight"));
    expect(localStorage.getItem("fatnassi-language")).toBe("zgh");
    await waitFor(() => expect(document.documentElement.lang).toBe("zgh"));
    expect(document.documentElement.dir).toBe("ltr");
  });

  it("restores the saved Tamazight choice on subsequent visits", async () => {
    localStorage.setItem("fatnassi-language", "zgh");
    render(<LanguageProvider><LanguageProbe /></LanguageProvider>);
    await waitFor(() => expect(screen.getByTestId("language").textContent).toBe("zgh"));
    fireEvent.click(screen.getByText("Choose French"));
    expect(localStorage.getItem("fatnassi-language")).toBe("fr");
  });
});

describe("requested site translations", () => {
  it("translates the international coverage sentence into Arabic", () => {
    expect(ar[internationalDescription]).toBe("يواكبكم مكتب FATNASSI للهندسة المعمارية في تصميم مشاريعكم المعمارية وإنجازها ومتابعتها في الدار البيضاء، وفي مختلف أنحاء فرنسا وإسبانيا وإيطاليا والمغرب.");
  });

  it("translates the principal architect description in every available language", () => {
    for (const dictionary of [ar, zgh, en, es, it]) {
      expect(dictionary[architectDescription]).not.toBe(architectDescription);
    }
  });
});