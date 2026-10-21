import { ListMusic } from "lucide-react";
import { useState } from "react";
import { IconButton } from "@/components/IconButton";
import { AddToPlaylistModal } from "./AddToPlaylistModal";

export function AddToPlaylistButton({ trackId }: { trackId: number }) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <IconButton icon={ListMusic} label="Ajouter à une playlist" size="sm" onClick={() => setOpen(true)} />
      <AddToPlaylistModal open={open} trackIds={[trackId]} onClose={() => setOpen(false)} />
    </>
  );
}
