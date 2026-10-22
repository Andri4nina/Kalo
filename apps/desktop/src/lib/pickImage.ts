import { open } from "@tauri-apps/plugin-dialog";

/** Ouvre le sélecteur natif d'images ; `null` si l'utilisateur annule. */
export async function pickImage(): Promise<string | null> {
  const source = await open({
    multiple: false,
    directory: false,
    filters: [{ name: "Images", extensions: ["jpg", "jpeg", "png", "webp", "gif"] }],
  });
  return typeof source === "string" ? source : null;
}
