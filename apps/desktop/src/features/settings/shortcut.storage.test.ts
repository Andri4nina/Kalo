import { beforeEach, describe, expect, it } from "vitest";
import { DEFAULT_BINDINGS, keyLabel } from "@/features/settings/shortcuts";
import { loadBindings, saveBindings } from "@/features/settings/shortcut.storage";

const KEY = "kalo:shortcuts";

beforeEach(() => localStorage.clear());

describe("raccourcis clavier", () => {
  it("utilise les valeurs par défaut sans réglage", () => {
    expect(loadBindings()).toEqual(DEFAULT_BINDINGS);
  });
  it("relit une personnalisation et complète les actions absentes", () => {
    localStorage.setItem(KEY, JSON.stringify({ toggle: "KeyK", next: 42 }));
    const bindings = loadBindings();
    expect(bindings.toggle).toBe("KeyK");
    expect(bindings.next).toBe(DEFAULT_BINDINGS.next);
  });
  it("ignore un contenu illisible", () => {
    localStorage.setItem(KEY, "{");
    expect(loadBindings()).toEqual(DEFAULT_BINDINGS);
  });
  it("enregistre puis relit les touches", () => {
    saveBindings({ ...DEFAULT_BINDINGS, mute: "KeyX" });
    expect(loadBindings().mute).toBe("KeyX");
  });
  it("affiche des libellés lisibles", () => {
    expect(keyLabel("Space")).toBe("Espace");
    expect(keyLabel("KeyM")).toBe("M");
  });
});
