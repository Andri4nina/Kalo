import { beforeEach, describe, expect, it } from "vitest";
import { usePlayer } from "@/features/player/player.store";
import { resetPlayer } from "@/features/player/player.store.test.helpers";
import { track, tracks } from "@/test/fixtures";
import { startCollection } from "./collection.play";

beforeEach(() => {
  localStorage.clear();
  resetPlayer();
});

describe("lecture d'une collection", () => {
  it("lance la file depuis le premier morceau avec sa provenance", () => {
    expect(startCollection(tracks(3), "Album test")).toBe(true);
    const state = usePlayer.getState();
    expect(state.queue.map((item) => item.id)).toEqual([1, 2, 3]);
    expect(state.index).toBe(0);
    expect(state.playing).toBe(true);
    expect(state.queueSource).toBe("Album test");
  });

  it("écarte les fichiers introuvables", () => {
    const missing = { ...track(2), isMissing: true };
    startCollection([track(1), missing, track(3)], "Playlist");
    expect(usePlayer.getState().queue.map((item) => item.id)).toEqual([1, 3]);
  });

  it("signale une collection sans morceau lisible sans toucher la file", () => {
    usePlayer.getState().playQueue(tracks(2));
    const missing = { ...track(9), isMissing: true };
    expect(startCollection([missing], "Vide")).toBe(false);
    expect(usePlayer.getState().queue).toHaveLength(2);
    expect(usePlayer.getState().error).toContain("Vide");
  });
});
