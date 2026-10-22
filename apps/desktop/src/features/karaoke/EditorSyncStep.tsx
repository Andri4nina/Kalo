import { RotateCcw, SquarePen, Timer } from "lucide-react";
import { Button } from "@/components/Button";
import { muted } from "@/design/tokens";
import { usePlayer } from "@/features/player/player.store";
import { cn } from "@/lib/cn";
import { formatStamp } from "./lrc.format";
import { EditorLineRow } from "./EditorLineRow";
import type { LyricsEditorState } from "./useLyricsEditor";

/** Étape 2 : pendant la lecture, marquer le début de chaque ligne. */
export function EditorSyncStep({ editor }: { editor: LyricsEditorState }) {
  const position = usePlayer((state) => state.positionMs);
  const current = editor.lines[editor.cursor];
  return (
    <div className="flex flex-col gap-3">
      <div className="flex flex-wrap items-center gap-2">
        <Button size="sm" onClick={editor.mark} autoFocus>
          <Timer size={15} aria-hidden /> Marquer la ligne {editor.cursor + 1}
        </Button>
        <Button variant="subtle" size="sm" onClick={editor.restart}><RotateCcw size={14} aria-hidden /> Recommencer</Button>
        <Button variant="ghost" size="sm" onClick={editor.editText}><SquarePen size={14} aria-hidden /> Modifier le texte</Button>
        <span className={cn("ml-auto text-xs tabular-nums", muted)}>Position {formatStamp(position)}</span>
      </div>
      <p className={cn("text-xs", muted)}>
        Lancez la lecture, puis appuyez sur « Marquer » (ou Entrée) au début de « {current?.text ?? ""} ».
      </p>
      <ol className="max-h-[50vh] overflow-y-auto">
        {editor.lines.map((line, index) => (
          <EditorLineRow
            key={`${index}-${line.text}`}
            line={line}
            index={index}
            current={index === editor.cursor}
            onSelect={() => editor.setCursor(index)}
            onPlace={() => editor.placeAt(index)}
            onShift={(delta) => editor.shift(index, delta)}
          />
        ))}
      </ol>
    </div>
  );
}
