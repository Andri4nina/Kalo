import { describe, expect, it } from "vitest";
import { greeting } from "./greeting";

const at = (hour: number) => new Date(2026, 9, 21, hour, 30);

describe("salutation de l'accueil", () => {
  it("dit bonjour le matin", () => {
    expect(greeting(at(5))).toBe("Bonjour");
    expect(greeting(at(11))).toBe("Bonjour");
  });

  it("dit bon après-midi entre midi et 18 h", () => {
    expect(greeting(at(12))).toBe("Bon après-midi");
    expect(greeting(at(17))).toBe("Bon après-midi");
  });

  it("dit bonsoir le soir et la nuit", () => {
    expect(greeting(at(18))).toBe("Bonsoir");
    expect(greeting(at(23))).toBe("Bonsoir");
    expect(greeting(at(2))).toBe("Bonsoir");
  });
});
