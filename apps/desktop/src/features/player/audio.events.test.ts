import { describe, expect, it } from "vitest";
import { playError, READ_ERROR } from "./audio.events";

describe("messages d'erreur de lecture", () => {
  it("traduit une source illisible en message Kalo", () => {
    const reason = new DOMException("Failed to load because no supported source was found.", "NotSupportedError");
    expect(playError(reason)).toBe(READ_ERROR);
  });

  it("conserve les autres messages", () => {
    expect(playError(new Error("Périphérique occupé"))).toBe("Périphérique occupé");
  });
});
