import { describe, expect, it } from "vitest";
import { contact } from "@/lib/site";

describe("office contact details", () => {
  it("keeps the owner-provided mobile number verbatim", () => {
    expect(contact.phone).toBe("0606647010");
  });

  it("links phone and WhatsApp to the same Moroccan number", () => {
    expect(contact.phoneHref).toBe("tel:+212606647010");
    expect(contact.whatsapp).toBe("212606647010");
  });

  it("keeps the owner-provided email verbatim", () => {
    expect(contact.email).toBe("fatnassi.architecte@gmail.com");
  });
});
