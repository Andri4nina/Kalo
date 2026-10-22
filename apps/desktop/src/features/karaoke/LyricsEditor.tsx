import { muted } from "@/design/tokens";
import { cn } from "@/lib/cn";
import type { LyricsSource, Track } from "@/types";
import { EditorFooter } from "./EditorFooter";
import { EditorSyncStep } from "./EditorSyncStep";
import { EditorTextStep } from "./EditorTextStep";
import { isComplete } from "./lrc.edit";
import { useLyricsEditor } from "./useLyricsEditor";
import { useLyricsPersistence } from "./useLyricsPersistence";

interface Props {
  track: Track;
  source: LyricsSource | null;
  onDone: () => void;
}

/** Synchronisation manuelle : texte, marquage pendant la lecture, enregistrement. */
export function LyricsEditor({ track, source, onDone }: Props) {
  const editor = useLyricsEditor(source?.content ?? "");
  const persistence = useLyricsPersistence(track, onDone);
  return (
    <section aria-label="Synchroniser les paroles">
      <div className="mb-4">
        <h2 className="font-display text-lg font-bold tracking-tight">Synchroniser les paroles</h2>
        <p className={cn("truncate text-xs", muted)}>{track.title} · {track.artist ?? "Artiste inconnu"}</p>
      </div>
      {editor.stage === "text" ? <EditorTextStep editor={editor} /> : <EditorSyncStep editor={editor} />}
      <EditorFooter
        complete={editor.stage === "sync" && isComplete(editor.lines)}
        edited={source?.origin === "edited"}
        busy={persistence.busy}
        error={persistence.error}
        notice={persistence.notice}
        onSave={() => void persistence.store(editor.lines)}
        onExport={() => void persistence.exportFile(editor.lines)}
        onRestore={() => void persistence.restore()}
        onCancel={onDone}
      />
    </section>
  );
}
