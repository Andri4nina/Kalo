import { Download, Upload } from "lucide-react";
import { Button } from "@/components/Button";
import type { Playlist } from "@/types";
import { M3uFeedbackModal } from "./M3uFeedbackModal";
import { usePlaylistM3u } from "./usePlaylistM3u";

export function M3uActions({ playlist }: { playlist: Playlist }) {
  const m3u = usePlaylistM3u(playlist);
  return (
    <>
      <Button variant="subtle" size="sm" disabled={m3u.busy} onClick={() => void m3u.importM3u()}>
        <Upload size={15} /> Importer
      </Button>
      <Button variant="subtle" size="sm" disabled={m3u.busy} onClick={() => void m3u.exportM3u()}>
        <Download size={15} /> Exporter
      </Button>
      <M3uFeedbackModal feedback={m3u.feedback} onClose={() => m3u.setFeedback(null)} />
    </>
  );
}