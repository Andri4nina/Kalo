import { describe, expect, it } from "vitest";
import { DEFAULT_EFFECTS, clampMix, compressorSettings, distortionCurve, normalizeEffects } from "./effects";

describe("effets studio", () => {
  it("borne les taux de mélange", () => {
    expect(clampMix(-1)).toBe(0);
    expect(clampMix(2)).toBe(1);
    expect(clampMix(0.456)).toBe(0.46);
    expect(clampMix(Number.NaN)).toBe(0);
  });
  it("normalise un état partiel", () => {
    expect(normalizeEffects({ reverb: 0.5 })).toEqual({ ...DEFAULT_EFFECTS, reverb: 0.5 });
    expect(normalizeEffects(null)).toEqual(DEFAULT_EFFECTS);
  });
  it("produit une courbe de saturation finie et bornée", () => {
    const curve = distortionCurve(0.8);
    expect(curve).toHaveLength(1024);
    expect([...curve].every((value) => Number.isFinite(value) && Math.abs(value) <= 1)).toBe(true);
  });
  it("durcit la compression avec le taux", () => {
    const soft = compressorSettings(0);
    const hard = compressorSettings(1);
    expect(soft.ratio).toBe(1);
    expect(hard.ratio).toBeGreaterThan(soft.ratio);
    expect(hard.threshold).toBeLessThan(soft.threshold);
  });
});
