import { describe, expect, it } from "vitest";
import { BANDS, PRESETS, applyEq, clampGain, clampPreamp, normalizeGains, preampGain, presetGains } from "./eq";

describe("égaliseur", () => {
  it("borne et normalise les gains", () => {
    expect(clampGain(99)).toBe(12);
    expect(clampGain(-99)).toBe(-12);
    expect(clampGain(2.3)).toBe(2.5);
    expect(clampGain(Number.NaN)).toBe(0);
    expect(normalizeGains([3, "x", 4])).toHaveLength(BANDS.length);
    expect(normalizeGains([3])[0]).toBe(3);
    expect(normalizeGains(null).every((gain) => gain === 0)).toBe(true);
  });

  it("définit des presets valides", () => {
    expect(PRESETS.length).toBeGreaterThan(0);
    for (const preset of PRESETS) {
      expect(preset.gains).toHaveLength(BANDS.length);
      expect(preset.gains.every((gain) => gain >= -12 && gain <= 12)).toBe(true);
    }
    expect(presetGains("inconnu")).toBeNull();
    expect(presetGains("bass")?.[0]).toBe(6);
  });

  it("borne le préampli et calcule son gain linéaire", () => {
    expect(clampPreamp(99)).toBe(12);
    expect(clampPreamp(-99)).toBe(-12);
    expect(preampGain(0)).toBe(1);
    expect(preampGain(6)).toBeCloseTo(1.995, 2);
  });

  it("applique ou contourne les gains", () => {
    const filters = BANDS.map(() => ({ gain: { value: 99 } })) as unknown as BiquadFilterNode[];
    const gains = presetGains("bass") ?? [];
    applyEq(filters, gains, true);
    expect(filters.map((filter) => filter.gain.value)).toEqual(gains);
    applyEq(filters, gains, false);
    expect(filters.every((filter) => filter.gain.value === 0)).toBe(true);
  });
});
