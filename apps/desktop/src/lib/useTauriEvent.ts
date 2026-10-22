import { listen } from "@tauri-apps/api/event";
import { useEffect, useRef } from "react";

/** Écoute un événement natif pendant la vie du composant. */
export function useTauriEvent<T>(name: string, onEvent: (payload: T) => void): void {
  const handler = useRef(onEvent);
  handler.current = onEvent;
  useEffect(() => {
    let active = true;
    let unlisten: (() => void) | undefined;
    listen<T>(name, (event) => handler.current(event.payload))
      .then((stop) => {
        if (active) unlisten = stop;
        else stop();
      })
      .catch(() => undefined);
    return () => {
      active = false;
      unlisten?.();
    };
  }, [name]);
}
