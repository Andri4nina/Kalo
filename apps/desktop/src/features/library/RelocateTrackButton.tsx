import { open } from "@tauri-apps/plugin-dialog";
import { FolderSearch } from "lucide-react";
import { useState } from "react";
import { IconButton } from "@/components/IconButton";
import { errorMessage } from "@/lib/format";
import { relocateTrack } from "@/lib/api/library";
import type { Track } from "@/types";
import { useLibraryVersion } from "./library.store";
import { RelocateErrorModal } from "./RelocateErrorModal";

export function RelocateTrackButton({ track }: { track: Track }) {
  const [error, setError] = useState<string | null>(null);
  const bump = useLibraryVersion((state) => state.bump);
  const pick = async () => {
    const path = await open({ multiple: false, directory: false, filters: [{ name: "Audio", extensions: ["mp3", "flac", "m4a", "aac", "ogg", "oga", "opus", "wav"] }] });
    if (typeof path !== "string") return;
    try {
      await relocateTrack(track.id, path);
      bump();
    } catch (reason: unknown) {
      setError(errorMessage(reason));
    }
  };
  return (
    <>
      <IconButton icon={FolderSearch} label="Relocaliser le fichier" size="sm" onClick={() => void pick()} />
      <RelocateErrorModal error={error} onClose={() => setError(null)} />
    </>
  );
}