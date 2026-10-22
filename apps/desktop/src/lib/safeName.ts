const FORBIDDEN = new RegExp('[<>:"/\\\\|?*\\u0000-\\u001f]', "g");

/** Nom de fichier proposé par défaut : caractères interdits remplacés. */
export function safeName(value: string, fallback = "Sans titre"): string {
  const cleaned = value.replace(FORBIDDEN, "_").trim().replace(/[. ]+$/, "");
  return cleaned.length > 0 ? cleaned.slice(0, 100) : fallback;
}
