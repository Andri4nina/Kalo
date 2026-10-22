import { describe, expect, it } from "vitest";
import { spectrumBars } from "./spectrum";

describe("barres du spectre", () => {
  it("produit le nombre de barres demandé, entre 0 et 1", () => {
    const data = new Uint8Array(1024).fill(255);
    const bars = spectrumBars(data, 32, 48_000);
    expect(bars).toHaveLength(32);
    expect(bars.every((value) => value === 1)).toBe(true);
  });

  it("place une raie grave à gauche et une aiguë à droite", () => {
    const data = new Uint8Array(1024);
    const binHz = 24_000 / 1024;
    data[Math.round(60 / binHz)] = 200;
    data[Math.round(10_000 / binHz)] = 100;
    const bars = spectrumBars(data, 16, 48_000);
    const lowIndex = bars.findIndex((value) => value > 0.7);
    const highIndex = bars.findIndex((value) => value > 0.3 && value < 0.5);
    expect(lowIndex).toBeLessThan(4);
    expect(highIndex).toBeGreaterThan(11);
  });
});
