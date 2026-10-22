import { useState } from "react";
import { usePlayer } from "./player.store";

/** Glisser-déposer dans la file ; les flèches restent l'alternative au clavier. */
export function useQueueDrag() {
  const [from, setFrom] = useState<number | null>(null);
  const [over, setOver] = useState<number | null>(null);
  const reset = () => {
    setFrom(null);
    setOver(null);
  };
  const bind = (index: number) => ({
    draggable: true,
    onDragStart: (event: React.DragEvent) => {
      event.dataTransfer.effectAllowed = "move";
      event.dataTransfer.setData("text/plain", String(index));
      setFrom(index);
    },
    onDragOver: (event: React.DragEvent) => {
      if (from === null) return;
      event.preventDefault();
      event.dataTransfer.dropEffect = "move";
      setOver(index);
    },
    onDrop: (event: React.DragEvent) => {
      event.preventDefault();
      if (from !== null) usePlayer.getState().moveInQueue(from, index);
      reset();
    },
    onDragEnd: reset,
  });
  return { bind, from, over };
}
