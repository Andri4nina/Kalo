import { FolderSearch } from "lucide-react";
import { IconButton } from "@/components/IconButton";
import type { Track } from "@/types";
import { RelocateErrorModal } from "./RelocateErrorModal";
import { useRelocateTrack } from "./useRelocateTrack";

export function RelocateTrackButton({ track }: { track: Track }) {
  const { pick, error, clearError } = useRelocateTrack(track);
  return (
    <>
      <IconButton icon={FolderSearch} label="Relocaliser le fichier" size="sm" onClick={() => void pick()} />
      <RelocateErrorModal error={error} onClose={clearError} />
    </>
  );
}
