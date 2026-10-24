import { describe, expect, it } from "vitest";
import { officeMaps } from "@/components/OfficeMaps";

describe("office map embeds", () => {
  it("keeps the owner-provided Morocco map embed verbatim", () => {
    expect(officeMaps[0].src).toBe("https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d2628.2847477787204!2d-7.678970924305236!3d33.54277297335309!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zMzPCsDMyJzM0LjAiTiA3wrA0MCczNS4wIlc!5e1!3m2!1sfr!2sma!4v1792638201313!5m2!1sfr!2sma");
    expect(officeMaps[0].label).toBe("Maroc");
  });

  it("keeps the owner-provided France map embed verbatim", () => {
    expect(officeMaps[1].src).toBe("https://www.google.com/maps/embed?pb=!1m16!1m12!1m3!1d8723.656956922821!2d2.3736037023930114!3d46.24272292787563!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!2m1!1s41%20La%20Grande%20Rue%2023170%20Lepaud%20France!5e1!3m2!1sfr!2sma!4v1792857770705!5m2!1sfr!2sma");
    expect(officeMaps[1].label).toBe("France");
    expect(officeMaps[1].caption).toBe("41 La Grande Rue, 23170 Lépaud, France");
  });
});
