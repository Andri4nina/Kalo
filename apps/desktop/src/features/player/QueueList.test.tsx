import { act } from "react";
import { createRoot } from "react-dom/client";
import { beforeEach, describe, expect, it } from "vitest";
import { tracks } from "@/test/fixtures";
import { usePlayer } from "./player.store";
import { resetPlayer } from "./player.store.test.helpers";
import { QueueList } from "./QueueList";

(globalThis as { IS_REACT_ACT_ENVIRONMENT?: boolean }).IS_REACT_ACT_ENVIRONMENT = true;

function drag(target: Element, type: string) {
  const event = new Event(type, { bubbles: true, cancelable: true });
  Object.defineProperty(event, "dataTransfer", { value: { setData: () => undefined, effectAllowed: "", dropEffect: "" } });
  act(() => { target.dispatchEvent(event); });
}

beforeEach(() => {
  localStorage.clear();
  resetPlayer();
});

describe("glisser-déposer dans la file", () => {
  it("déplace le morceau déposé et garde le morceau en cours", () => {
    usePlayer.getState().playQueue(tracks(3), 0);
    const container = document.createElement("div");
    document.body.append(container);
    const root = createRoot(container);
    act(() => root.render(<QueueList queue={usePlayer.getState().queue} index={0} />));
    const rows = container.querySelectorAll("[draggable='true']");
    const [first, , third] = [...rows];
    if (!first || !third) throw new Error("lignes absentes");
    drag(first, "dragstart");
    drag(third, "dragover");
    drag(third, "drop");
    const state = usePlayer.getState();
    expect(state.queue.map((item) => item.id)).toEqual([2, 3, 1]);
    expect(state.index).toBe(2);
    act(() => root.unmount());
    container.remove();
  });
});
