import type { StoreApi } from "zustand";
import type { StudioState } from "./studio.types";

export type StudioSet = StoreApi<StudioState>["setState"];
export type StudioGet = StoreApi<StudioState>["getState"];
