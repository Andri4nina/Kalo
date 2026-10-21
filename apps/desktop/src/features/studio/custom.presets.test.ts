import { describe, expect, it } from "vitest";
import { MAX_CUSTOM_PRESETS, createPreset, normalizePresets } from "./custom.presets";
import { DEFAULT_EFFECTS } from "./effects";
import { BANDS } from "./eq";

describe("presets personnalisés", () => {
  it("refuse un nom vide et normalise les réglages", () => {
    expect(createPreset("   ", [], 0, DEFAULT_EFFECTS)).toBeNull();
    const preset = createPreset("  Mon son  ", [99], 40, { ...DEFAULT_EFFECTS, reverb: 2 });
    expect(preset?.label).toBe("Mon son");
    expect(preset?.gains).toHaveLength(BANDS.length);
    expect(preset?.gains[0]).toBe(12);
    expect(preset?.preamp).toBe(12);
    expect(preset?.effects.reverb).toBe(1);
  });
  it("ignore les entrées invalides et limite le nombre", () => {
    expect(normalizePresets("nope")).toEqual([]);
    const many = Array.from({ length: MAX_CUSTOM_PRESETS + 5 }, (_, index) => ({ id: `id-${index}`, label: `P${index}`, gains: [], preamp: 0, effects: {} }));
    expect(normalizePresets(many)).toHaveLength(MAX_CUSTOM_PRESETS);
    expect(normalizePresets([{ id: "x" }, null, 3])).toEqual([]);
  });
});
