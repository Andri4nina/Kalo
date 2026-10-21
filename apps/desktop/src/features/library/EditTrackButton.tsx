import { Pencil } from "lucide-react";
import { useState } from "react";
import { IconButton } from "@/components/IconButton";
import type { Track } from "@/types";
import { EditTrackModal } from "./EditTrackModal";

export function EditTrackButton({ track }: { track: Track }) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <IconButton icon={Pencil} label="Modifier les métadonnées" size="sm" onClick={() => setOpen(true)} />
      <EditTrackModal open={open} track={track} onClose={() => setOpen(false)} />
    </>
  );
}