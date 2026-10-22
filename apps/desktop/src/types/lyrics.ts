/** Provenance des paroles affichées. */
export type LyricsOrigin = "edited" | "lrcFile" | "textFile";

export interface LyricsSource {
  content: string;
  origin: LyricsOrigin;
}
