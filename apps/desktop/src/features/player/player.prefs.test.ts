import { beforeEach, describe, expect, it } from "vitest";
import { loadPlayerPrefs, savePlayerPrefs } from "@/features/player/player.prefs";

const KEY = "kalo:player-prefs";

beforeEach(() => localStorage.clear());

describe("préférences du lecteur", () => {
  it("applique les valeurs par défaut", () => {
    expect(loadPlayerPrefs()).toEqual({ volume: 0.8, balance: 0, shuffle: false, repeat: "off" });
  });
  it("borne et valide les valeurs stockées", () => {
    localStorage.setItem(KEY, JSON.stringify({ volume: 4, balance: -9, shuffle: "oui", repeat: "x" }));
    expect(loadPlayerPrefs()).toEqual({ volume: 1, balance: -1, shuffle: false, repeat: "off" });
    localStorage.setItem(KEY, JSON.stringify({ volume: -1, repeat: "one" }));
    expect(loadPlayerPrefs()).toMatchObject({ volume: 0, repeat: "one" });
  });
  it("ignore un contenu illisible", () => {
    localStorage.setItem(KEY, "{");
    expect(loadPlayerPrefs().volume).toBe(0.8);
  });
  it("fusionne une modification partielle", () => {
    savePlayerPrefs({ balance: 0.5 });
    expect(loadPlayerPrefs()).toMatchObject({ balance: 0.5, volume: 0.8 });
  });
});
