import { beforeEach, describe, expect, it } from "vitest";
import { usePlayer } from "@/features/player/player.store";
import { resetPlayer } from "@/features/player/player.store.test.helpers";
import { track, tracks } from "@/test/fixtures";

beforeEach(() => {
  localStorage.clear();
  resetPlayer();
});
describe("actions de transport", () => {
  it("démarre une file à l'index demandé", () => {
    usePlayer.getState().playQueue(tracks(3), 5);
    expect(usePlayer.getState().index).toBe(2);
    expect(usePlayer.getState().playing).toBe(true);
  });
  it("retrouve le morceau dans sa source", () => {
    usePlayer.getState().playTrack(track(2), tracks(3));
    expect(usePlayer.getState().index).toBe(1);
  });
  it("ignore les sauts hors bornes et vide la file", () => {
    usePlayer.getState().playQueue(tracks(2));
    usePlayer.getState().jumpTo(5);
    expect(usePlayer.getState().index).toBe(0);
    usePlayer.getState().clearQueue();
    expect(usePlayer.getState().queue).toHaveLength(0);
    expect(usePlayer.getState().playing).toBe(false);
  });
  it("boucle en fin de file selon la répétition", () => {
    usePlayer.getState().playQueue(tracks(2));
    usePlayer.getState().next();
    usePlayer.getState().next();
    expect(usePlayer.getState().index).toBe(1);
    usePlayer.setState({ index: 1, repeat: "all" });
    usePlayer.getState().next();
    expect(usePlayer.getState().index).toBe(0);
  });
});
