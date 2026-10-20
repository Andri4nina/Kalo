import { beforeEach, describe, expect, it } from "vitest";
import { loadPlayerSession, persistPlayerSession } from "@/features/player/player.session.storage";
import { track, tracks } from "@/test/fixtures";

const KEY = "kalo:player-session";

beforeEach(() => localStorage.clear());

describe("session du lecteur", () => {
  it("enregistre et relit la file", () => {
    persistPlayerSession(tracks(2), 1);
    const session = loadPlayerSession();
    expect(session?.queue).toHaveLength(2);
    expect(session?.index).toBe(1);
  });
  it("refuse un contenu illisible ou vide", () => {
    localStorage.setItem(KEY, "{");
    expect(loadPlayerSession()).toBeNull();
    localStorage.setItem(KEY, JSON.stringify({ queue: [], index: 0 }));
    expect(loadPlayerSession()).toBeNull();
  });
  it("filtre les morceaux invalides et corrige l'index", () => {
    const raw = { queue: [track(1), { id: "x" }, track(2)], index: 9 };
    localStorage.setItem(KEY, JSON.stringify(raw));
    const session = loadPlayerSession();
    expect(session?.queue).toHaveLength(2);
    expect(session?.index).toBe(0);
  });
  it("limite la file à 500 morceaux", () => {
    persistPlayerSession(tracks(505), 0);
    expect(loadPlayerSession()?.queue).toHaveLength(500);
  });
});
