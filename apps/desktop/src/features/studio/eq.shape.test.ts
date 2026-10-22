import { beforeEach, describe, expect, it } from "vitest";
import { clampFreq, clampQ, DEFAULT_SHAPE, normalizeShape } from "./eq.shape";
import { useEqShape } from "./eq.shape.store";

beforeEach(() => {
  localStorage.clear();
  useEqShape.getState().reset();
});

describe("égaliseur paramétrique", () => {
  it("borne la fréquence et la largeur", () => {
    expect(clampFreq(5, 100)).toBe(20);
    expect(clampFreq(40_000, 100)).toBe(20_000);
    expect(clampFreq(Number.NaN, 100)).toBe(100);
    expect(clampQ(0.01)).toBe(0.3);
    expect(clampQ(12)).toBe(8);
    expect(clampQ(1.26)).toBe(1.3);
  });

  it("revient au réglage d'usine pour une valeur stockée corrompue", () => {
    const shape = normalizeShape([{ freq: "x", q: 2 }, null]);
    expect(shape).toHaveLength(DEFAULT_SHAPE.length);
    expect(shape[0]).toEqual({ freq: DEFAULT_SHAPE[0]?.freq, q: 2 });
    expect(shape[1]).toEqual(DEFAULT_SHAPE[1]);
    expect(normalizeShape("corrompu")).toEqual(DEFAULT_SHAPE);
  });

  it("modifie une bande et la mémorise", () => {
    useEqShape.getState().setBand(2, { freq: 150, q: 3 });
    expect(useEqShape.getState().bands[2]).toEqual({ freq: 150, q: 3 });
    expect(localStorage.getItem("kalo:studio-bands")).toContain("150");
  });
});
