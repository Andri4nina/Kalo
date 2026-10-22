import { describe, expect, it } from "vitest";
import { safeName } from "./safeName";

describe("nom de fichier proposé", () => {
  it("remplace les caractères interdits et les points finaux", () => {
    expect(safeName("AC/DC: Live?")).toBe("AC_DC_ Live_");
    expect(safeName("Titre...")).toBe("Titre");
  });

  it("revient au nom par défaut quand il ne reste rien", () => {
    expect(safeName("  ")).toBe("Sans titre");
    expect(safeName("", "paroles")).toBe("paroles");
  });
});
