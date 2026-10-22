import { describe, expect, it } from "vitest";
import { toTrackFilters } from "@/features/library/filters";

describe("filtres de bibliothèque", () => {
  it("convertit les valeurs par défaut en absence de filtre", () => {
    expect(toTrackFilters({ format: "all", availability: "all", duration: "all", kind: "all" })).toEqual({
      format: null,
      availability: null,
      minDurationMs: null,
      maxDurationMs: null,
      kind: null,
    });
  });
  it("borne les durées courtes, moyennes et longues", () => {
    const short = toTrackFilters({ format: "all", availability: "all", duration: "short", kind: "all" });
    const medium = toTrackFilters({ format: "all", availability: "all", duration: "medium", kind: "all" });
    const long = toTrackFilters({ format: "all", availability: "all", duration: "long", kind: "all" });
    expect(short.maxDurationMs).toBe(119_999);
    expect(medium.minDurationMs).toBe(120_000);
    expect(medium.maxDurationMs).toBe(300_000);
    expect(long.minDurationMs).toBe(300_001);
  });
  it("transmet le format et la disponibilité", () => {
    expect(toTrackFilters({ format: "FLAC", availability: "missing", duration: "all", kind: "other" })).toMatchObject({ format: "FLAC", availability: "missing", kind: "other" });
  });
});