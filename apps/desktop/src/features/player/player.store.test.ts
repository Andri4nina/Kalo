import { beforeEach, describe, expect, it } from "vitest";
import { usePlayer } from "@/features/player/player.store";
import { track, tracks } from "@/test/fixtures";

const reset = () =>
  usePlayer.setState({
    queue: [],
    index: -1,
    resumePositionMs: 0,
    playing: false,
    positionMs: 0,
    error: null,
    volume: 0.8,
    balance: 0,
    shuffle: false,
    repeat: "off",
    muted: false,
  });

beforeEach(() => {
  localStorage.clear();
  reset();
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
