import { afterEach, describe, expect, it, vi } from "vitest";
import { nextIndex, previousIndex } from "@/features/player/player.queue";
import { tracks } from "@/test/fixtures";

const queue = tracks(3);

afterEach(() => vi.restoreAllMocks());

describe("nextIndex", () => {
  it("avance puis s'arrête sans répétition", () => {
    expect(nextIndex({ queue, index: 0, shuffle: false, repeat: "off" })).toBe(1);
    expect(nextIndex({ queue, index: 2, shuffle: false, repeat: "off" })).toBeNull();
  });
  it("revient au début en répétition globale", () => {
    expect(nextIndex({ queue, index: 2, shuffle: false, repeat: "all" })).toBe(0);
  });
  it("gère une file vide ou à un seul morceau", () => {
    expect(nextIndex({ queue: [], index: -1, shuffle: false, repeat: "off" })).toBeNull();
    expect(nextIndex({ queue: tracks(1), index: 0, shuffle: true, repeat: "off" })).toBe(0);
  });
  it("évite le morceau courant en aléatoire", () => {
    vi.spyOn(Math, "random").mockReturnValue(0);
    expect(nextIndex({ queue, index: 0, shuffle: true, repeat: "off" })).not.toBe(0);
    vi.spyOn(Math, "random").mockReturnValue(0.99);
    expect(nextIndex({ queue, index: 2, shuffle: true, repeat: "off" })).not.toBe(2);
  });
});

describe("previousIndex", () => {
  it("recule ou boucle au début", () => {
    expect(previousIndex({ queue, index: 2, shuffle: false, repeat: "off" })).toBe(1);
    expect(previousIndex({ queue, index: 0, shuffle: false, repeat: "off" })).toBe(0);
    expect(previousIndex({ queue, index: 0, shuffle: false, repeat: "all" })).toBe(2);
  });
});
