import { useState } from "react";
import { usePlayer } from "@/features/player/player.store";
import { nextUnstamped, nudge, prepare, stamp, type EditLine } from "./lrc.edit";

/** État de l'éditeur : texte à préparer, puis lignes à marquer pendant la lecture. */
export function useLyricsEditor(initial: string) {
  const [draft, setDraft] = useState(initial);
  const [lines, setLines] = useState<EditLine[]>(() => prepare(initial));
  const [cursor, setCursor] = useState(() => Math.max(0, nextUnstamped(prepare(initial))));
  const [stage, setStage] = useState<"text" | "sync">(() => (prepare(initial).length > 0 ? "sync" : "text"));
  const position = () => usePlayer.getState().positionMs;

  const start = () => {
    const prepared = prepare(draft);
    setLines(prepared);
    setCursor(Math.max(0, nextUnstamped(prepared)));
    setStage(prepared.length > 0 ? "sync" : "text");
  };
  const mark = () => {
    setLines((current) => stamp(current, cursor, position()));
    setCursor((current) => Math.min(current + 1, Math.max(lines.length - 1, 0)));
  };
  const placeAt = (index: number) => setLines((current) => stamp(current, index, position()));
  const shift = (index: number, deltaMs: number) => setLines((current) => nudge(current, index, deltaMs));
  const restart = () => {
    setLines((current) => current.map((line) => ({ ...line, timeMs: null })));
    setCursor(0);
  };
  const editText = () => {
    setDraft(lines.map((line) => line.text).join("\n"));
    setStage("text");
  };

  return { draft, setDraft, lines, cursor, setCursor, stage, start, mark, placeAt, shift, restart, editText };
}

export type LyricsEditorState = ReturnType<typeof useLyricsEditor>;
