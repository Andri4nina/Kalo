import type { StoreApi } from "zustand";
import type { PlayerState } from "./player.types";

export type PlayerSet = StoreApi<PlayerState>["setState"];
export type PlayerGet = StoreApi<PlayerState>["getState"];

export type QueueActions = Pick<
  PlayerState,
  "enqueue" | "removeFromQueue" | "patchTrack" | "clearQueue" | "setQueueOpen"
>;
