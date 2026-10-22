import { describe, expect, it } from "vitest";
import { formatBytes } from "./bytes";

describe("tailles lisibles", () => {
  it("choisit l'unité adaptée", () => {
    expect(formatBytes(0)).toBe("0 o");
    expect(formatBytes(512)).toBe("512 o");
    expect(formatBytes(78_856_560).replace(/\s/g, " ")).toBe("78,9 Mo");
    expect(formatBytes(2_500_000_000).replace(/\s/g, " ")).toBe("2,5 Go");
  });
});
