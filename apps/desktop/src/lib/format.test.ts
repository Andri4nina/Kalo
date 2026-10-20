import { describe, expect, it } from "vitest";
import { errorMessage, formatDuration, formatLongDuration } from "@/lib/format";

describe("formatDuration", () => {
  it("formate les durées valides", () => {
    expect(formatDuration(0)).toBe("0:00");
    expect(formatDuration(61_000)).toBe("1:01");
    expect(formatDuration(3_600_000)).toBe("60:00");
  });
  it("neutralise les valeurs invalides", () => {
    expect(formatDuration(Number.NaN)).toBe("0:00");
    expect(formatDuration(-1)).toBe("0:00");
  });
});

describe("formatLongDuration", () => {
  it("affiche les minutes ou les heures", () => {
    expect(formatLongDuration(59_000)).toBe("0 min");
    expect(formatLongDuration(3_900_000)).toBe("1 h 05");
  });
});

describe("errorMessage", () => {
  it("extrait un message lisible", () => {
    expect(errorMessage("échec")).toBe("échec");
    expect(errorMessage(new Error("boum"))).toBe("boum");
    expect(errorMessage(null)).toBe("Erreur inattendue");
  });
});
