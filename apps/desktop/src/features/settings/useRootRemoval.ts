import { useState } from "react";
import { removeRoot } from "@/lib/api/library";
import { errorMessage } from "@/lib/format";
import type { LibraryRoot } from "@/types";

export function useRootRemoval(onRemoved: () => void) {
  const [target, setTarget] = useState<LibraryRoot | null>(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const remove = async () => {
    if (!target) return;
    setBusy(true);
    setError(null);
    try {
      await removeRoot(target.id);
      setTarget(null);
      onRemoved();
    } catch (reason: unknown) {
      setError(errorMessage(reason));
    } finally {
      setBusy(false);
    }
  };

  return {
    target,
    busy,
    error,
    ask: setTarget,
    cancel: () => setTarget(null),
    remove,
  };
}
