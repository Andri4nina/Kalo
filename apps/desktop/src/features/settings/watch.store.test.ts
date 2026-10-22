import { beforeEach, describe, expect, it } from "vitest";
import { useFolderWatchPrefs } from "./watch.store";

beforeEach(() => {
  localStorage.clear();
  useFolderWatchPrefs.setState({ enabled: true, error: "ancienne erreur" });
});

describe("réglage de surveillance des dossiers", () => {
  it("mémorise la désactivation et efface l'erreur", () => {
    useFolderWatchPrefs.getState().setEnabled(false);
    expect(localStorage.getItem("kalo:watch-folders")).toBe("false");
    expect(useFolderWatchPrefs.getState().enabled).toBe(false);
    expect(useFolderWatchPrefs.getState().error).toBeNull();
  });

  it("garde l'erreur de démarrage signalée par le moteur natif", () => {
    useFolderWatchPrefs.getState().setError("Surveillance impossible");
    expect(useFolderWatchPrefs.getState().error).toBe("Surveillance impossible");
  });
});
