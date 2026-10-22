import { ListChecks } from "lucide-react";
import { Button } from "@/components/Button";
import { TextArea } from "@/components/TextArea";
import { muted } from "@/design/tokens";
import { cn } from "@/lib/cn";
import type { LyricsEditorState } from "./useLyricsEditor";

/** Étape 1 : coller ou corriger le texte, une ligne par ligne chantée. */
export function EditorTextStep({ editor }: { editor: LyricsEditorState }) {
  return (
    <div className="flex flex-col gap-3">
      <TextArea
        label="Texte des paroles"
        rows={12}
        value={editor.draft}
        onChange={(event) => editor.setDraft(event.target.value)}
        placeholder="Collez les paroles, une ligne par ligne chantée."
        hint="Un fichier LRC collé ici conserve ses horodatages."
      />
      <div className="flex flex-wrap items-center gap-3">
        <Button size="sm" disabled={editor.draft.trim().length === 0} onClick={editor.start}>
          <ListChecks size={15} aria-hidden /> Passer à la synchronisation
        </Button>
        <p className={cn("text-xs", muted)}>Les paroles restent sur cet appareil ; rien n'est envoyé en ligne.</p>
      </div>
    </div>
  );
}
