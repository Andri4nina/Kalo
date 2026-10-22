import { describe, expect, it } from "vitest";
import { track } from "@/test/fixtures";
import type { Playlist } from "@/types";
import { filterPlaylists, filterRows, normalize } from "./playlist.search";

const playlist = (id: number, name: string, description = ""): Playlist => ({
  id,
  name,
  description,
  coverPath: null,
  trackCount: 0,
  createdAt: 0,
  updatedAt: 0,
});

describe("recherche dans les playlists", () => {
  it("ignore la casse et les accents", () => {
    expect(normalize("  Soirée ÉTÉ ")).toBe("soiree ete");
  });

  it("filtre les playlists par nom ou description", () => {
    const list = [playlist(1, "Soirée"), playlist(2, "Sport", "matin calme"), playlist(3, "Travail")];
    expect(filterPlaylists(list, "soiree").map((item) => item.id)).toEqual([1]);
    expect(filterPlaylists(list, "CALME").map((item) => item.id)).toEqual([2]);
    expect(filterPlaylists(list, "  ")).toHaveLength(3);
  });

  it("garde la position d'origine des morceaux filtrés", () => {
    const tracks = [track(1, "Alpha"), track(2, "Bêta"), track(3, "Gamma")];
    const rows = filterRows(tracks, "beta");
    expect(rows).toHaveLength(1);
    expect(rows[0]?.index).toBe(1);
    expect(filterRows(tracks, "")).toHaveLength(3);
  });
});
