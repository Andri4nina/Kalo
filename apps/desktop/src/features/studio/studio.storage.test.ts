import { beforeEach, describe, expect, it } from "vitest";
import { STUDIO_FALLBACK, loadStoredStudio, saveStoredStudio } from "./studio.storage";

beforeEach(() => localStorage.clear());

describe("stockage studio", () => {
  it("retombe sur les valeurs par défaut", () => {
    expect(loadStoredStudio()).toEqual(STUDIO_FALLBACK);
  });
  it("relit un état enregistré", () => {
    saveStoredStudio({ ...STUDIO_FALLBACK, enabled: true, preset: "custom", effects: { ...STUDIO_FALLBACK.effects, echo: 0.4 } });
    const state = loadStoredStudio();
    expect(state.enabled).toBe(true);
    expect(state.preset).toBe("custom");
    expect(state.effects.echo).toBe(0.4);
  });
  it("ignore un contenu illisible", () => {
    localStorage.setItem("kalo:studio-eq", "{");
    expect(loadStoredStudio()).toEqual(STUDIO_FALLBACK);
  });
});
