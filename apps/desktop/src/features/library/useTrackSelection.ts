import { useState } from "react";

export interface TrackSelection {
  selected: ReadonlySet<number>;
  toggle: (id: number) => void;
  toggleAll: (ids: number[]) => void;
  clear: () => void;
}

export function useTrackSelection(): TrackSelection {
  const [selected, setSelected] = useState<Set<number>>(new Set());
  const toggle = (id: number) =>
    setSelected((previous) => {
      const next = new Set(previous);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  const toggleAll = (ids: number[]) =>
    setSelected((previous) => (ids.every((id) => previous.has(id)) ? new Set() : new Set(ids)));
  const clear = () => setSelected(new Set());
  return { selected, toggle, toggleAll, clear };
}
