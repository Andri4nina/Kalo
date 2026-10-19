import { convertFileSrc } from "@tauri-apps/api/core";

export function isTauri(): boolean {
  return typeof window !== "undefined" && "__TAURI_INTERNALS__" in window;
}

export function assetUrl(path: string | null | undefined): string | null {
  if (!path) return null;
  if (!isTauri()) return null;
  return convertFileSrc(path);
}
