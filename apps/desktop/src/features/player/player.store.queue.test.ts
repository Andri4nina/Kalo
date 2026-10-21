import { beforeEach, describe, expect, it } from "vitest";
import { usePlayer } from "@/features/player/player.store";
import { resetPlayer } from "@/features/player/player.store.test.helpers";
import { track, tracks } from "@/test/fixtures";

beforeEach(() => {
  localStorage.clear();
  resetPlayer();
});
describe("actions de file", () => {
  it("insère un morceau après le courant avec playNext", () => {
    usePlayer.getState().playQueue(tracks(3));
    usePlayer.setState({ index: 0 });
    usePlayer.getState().playNext(track(99));
    expect(usePlayer.getState().queue.at(1)?.id).toBe(99);
    expect(usePlayer.getState().index).toBe(0);
  });
  it("remonte et descend un morceau en corrigeant l'index", () => {
    usePlayer.getState().playQueue(tracks(3));
    usePlayer.setState({ index: 2 });
    usePlayer.getState().moveInQueue(2, 0);
    expect(usePlayer.getState().queue.at(0)?.id).toBe(3);
    expect(usePlayer.getState().index).toBe(0);
    usePlayer.getState().moveInQueue(0, 2);
    expect(usePlayer.getState().index).toBe(2);
  });
  it("ignore un déplacement hors bornes", () => {
    usePlayer.getState().playQueue(tracks(2));
    usePlayer.getState().moveInQueue(0, 5);
    expect(usePlayer.getState().queue.at(0)?.id).toBe(1);
  });
});
