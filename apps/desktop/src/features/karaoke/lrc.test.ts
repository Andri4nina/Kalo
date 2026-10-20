import { describe, expect, it } from "vitest";
import { activeLineIndex, parseLrc } from "./lrc";

describe("paroles LRC", () => {
  it("lit les horodatages, les métadonnées et les balises de mot", () => {
    const raw = "\uFEFF[ar:Test]\n[00:02.50][00:03.5]Refrain\n[00:01]Début <00:01.00>fort\n[ti:Titre]\n";
    const lines = parseLrc(raw);
    expect(lines.map((line) => line.timeMs)).toEqual([1_000, 2_500, 3_500]);
    expect(lines[0]?.text).toBe("Début fort");
    expect(lines[1]?.text).toBe("Refrain");
    expect(lines[2]?.text).toBe("Refrain");
  });

  it("ignore les lignes sans horodatage", () => {
    expect(parseLrc("Pas de temps\n[00:01.00]Oui\n")).toEqual([{ timeMs: 1_000, text: "Oui" }]);
    expect(parseLrc("")).toEqual([]);
  });

  it("trouve la ligne active avec un décalage", () => {
    const lines = parseLrc("[00:01.00]Un\n[00:02.50]Deux\n[00:04.00]Trois\n");
    expect(activeLineIndex(lines, 900)).toBe(-1);
    expect(activeLineIndex(lines, 1_000)).toBe(0);
    expect(activeLineIndex(lines, 2_600)).toBe(1);
    expect(activeLineIndex(lines, 2_600, 1_500)).toBe(0);
    expect(activeLineIndex(lines, 9_000)).toBe(2);
  });
});
