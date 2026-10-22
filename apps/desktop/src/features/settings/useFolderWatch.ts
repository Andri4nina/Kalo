import { useEffect } from "react";
import { useLibraryVersion } from "@/features/library/library.store";
import { setFolderWatch } from "@/lib/api/maintenance";
import { isTauri } from "@/lib/assets";
import { errorMessage } from "@/lib/format";
import { useTauriEvent } from "@/lib/useTauriEvent";
import type { LibraryChanges } from "@/types";
import { useFolderWatchPrefs } from "./watch.store";

/** Active la surveillance native selon le réglage et rafraîchit les vues. */
export function useFolderWatch(): void {
  const enabled = useFolderWatchPrefs((state) => state.enabled);
  const bump = useLibraryVersion((state) => state.bump);
  useTauriEvent<LibraryChanges>("library:changed", () => bump());
  useEffect(() => {
    if (!isTauri()) return;
    setFolderWatch(enabled).catch((reason: unknown) => {
      useFolderWatchPrefs.getState().setError(errorMessage(reason));
    });
  }, [enabled]);
}
