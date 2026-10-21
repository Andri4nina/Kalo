import { beforeEach, describe, expect, it } from "vitest";
import { usePlayer } from "@/features/player/player.store";
import { resetPlayer } from "@/features/player/player.store.test.helpers";
import { track, tracks } from "@/test/fixtures";

beforeEach(() => {
  localStorage.clear();
  resetPlayer();
});

describe("historique de file", () => {
  it("conserve la provenance et le morceau précédent", () => {
    usePlayer.getState().playQueue(tracks(3), 0, "Bibliothèque");
    usePlayer.getState().next();
    expect(usePlayer.getState().queueSource).toBe("Bibliothèque");
    expect(usePlayer.getState().history[0]?.id).toBe(1);
    usePlayer.getState().replayHistory(track(1));
    expect(usePlayer.getState().index).toBe(0);
  });
  it("vide l'historique avec la file", () => {
    usePlayer.getState().playQueue(tracks(2), 0, "Favoris");
    usePlayer.getState().next();
    usePlayer.getState().clearQueue();
    expect(usePlayer.getState().history).toHaveLength(0);
    expect(usePlayer.getState().queueSource).toBeNull();
  });
});
