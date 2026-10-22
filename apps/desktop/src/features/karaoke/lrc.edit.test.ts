import { describe, expect, it } from "vitest";
import { parseLrc } from "./lrc";
import { isComplete, nextUnstamped, nudge, prepare, stamp } from "./lrc.edit";
import { formatStamp, toLrc } from "./lrc.format";

describe("édition de la synchronisation LRC", () => {
  it("prépare un texte brut ligne par ligne", () => {
    const lines = prepare("\uFEFFPremière ligne\n\n  Deuxième  \r\n");
    expect(lines).toEqual([
      { text: "Première ligne", timeMs: null },
      { text: "Deuxième", timeMs: null },
    ]);
    expect(nextUnstamped(lines)).toBe(0);
    expect(isComplete(lines)).toBe(false);
  });

  it("reprend les horodatages d'un LRC existant", () => {
    expect(prepare("[00:05.20]B\n[00:01.00]A")).toEqual([
      { text: "A", timeMs: 1000 },
      { text: "B", timeMs: 5200 },
    ]);
  });

  it("marque, ajuste sans passer sous zéro et complète", () => {
    let lines = prepare("A\nB");
    lines = stamp(lines, 0, 1234.6);
    lines = nudge(lines, 0, -2000);
    expect(lines[0]?.timeMs).toBe(0);
    expect(nudge(lines, 1, 100)).toEqual(lines);
    lines = stamp(lines, 1, 62_350);
    expect(isComplete(lines)).toBe(true);
  });

  it("produit un LRC trié et relisible", () => {
    const lines = [
      { text: "Refrain", timeMs: 62_350 },
      { text: "Couplet", timeMs: 1_000 },
      { text: "Oubliée", timeMs: null },
    ];
    expect(formatStamp(62_350)).toBe("01:02.35");
    const lrc = toLrc(lines);
    expect(lrc).toBe("[00:01.00]Couplet\n[01:02.35]Refrain\n");
    expect(parseLrc(lrc).map((line) => line.text)).toEqual(["Couplet", "Refrain"]);
  });
});
