import { act } from "react";
import { createRoot } from "react-dom/client";
import { describe, expect, it } from "vitest";
import { Modal } from "@/components/Modal";

(globalThis as { IS_REACT_ACT_ENVIRONMENT?: boolean }).IS_REACT_ACT_ENVIRONMENT = true;
function render(open: boolean, onClose: () => void = () => undefined) {
  const container = document.createElement("div");
  document.body.append(container);
  const root = createRoot(container);
  act(() => {
    root.render(
      <Modal open={open} title="Essai" onClose={onClose}>
        <button type="button">Confirmer</button>
      </Modal>,
    );
  });
  return () => {
    act(() => root.unmount());
    container.remove();
  };
}

describe("Modal", () => {
  it("place puis restaure le focus", () => {
    const trigger = document.createElement("button");
    document.body.append(trigger);
    trigger.focus();
    const close = render(true);
    expect(document.activeElement?.getAttribute("aria-label")).toBe("Fermer");
    close();
    expect(document.activeElement).toBe(trigger);
    trigger.remove();
  });
  it("piège la tabulation et ferme avec Échap", () => {
    let closed = 0;
    const close = render(true, () => closed++);
    const buttons = document.querySelectorAll<HTMLButtonElement>('[role="dialog"] button');
    buttons[1]?.focus();
    act(() => {
      document.dispatchEvent(new KeyboardEvent("keydown", { key: "Tab", bubbles: true }));
    });
    expect(document.activeElement).toBe(buttons[0]);
    act(() => {
      document.dispatchEvent(new KeyboardEvent("keydown", { key: "Escape", bubbles: true }));
    });
    close();
    expect(closed).toBe(1);
  });
});
