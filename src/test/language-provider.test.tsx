import { fireEvent, render, screen, waitFor, cleanup } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it } from "vitest";
import { LanguageProvider, useLanguage, languages } from "@/components/LanguageProvider";

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