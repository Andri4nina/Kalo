import { beforeEach, describe, expect, it } from "vitest";
import { loadKaraokeOffset, saveKaraokeOffset } from "@/features/karaoke/karaoke.prefs";

beforeEach(() => localStorage.clear());

describe("décalage karaoké", () => {
  it("mémorise un décalage par morceau", () => {
    saveKaraokeOffset(1, 1_500);
    saveKaraokeOffset(2, -500);
    expect(loadKaraokeOffset(1)).toBe(1_500);
    expect(loadKaraokeOffset(2)).toBe(-500);
    expect(loadKaraokeOffset(3)).toBe(0);
  });
  it("borne le décalage à cinq secondes", () => {
    saveKaraokeOffset(1, 9_000);
    expect(loadKaraokeOffset(1)).toBe(5_000);
    saveKaraokeOffset(1, -9_000);
    expect(loadKaraokeOffset(1)).toBe(-5_000);
  });
  it("ignore un stockage illisible", () => {
    localStorage.setItem("kalo:karaoke-offsets", "{");
    expect(loadKaraokeOffset(1)).toBe(0);
  });
});