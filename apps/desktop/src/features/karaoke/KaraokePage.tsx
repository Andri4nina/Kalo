import { Timer } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "@/components/Button";
import { Card } from "@/components/Card";
import { PageHeader } from "@/components/PageHeader";
import { useCurrentTrack } from "@/features/player/player.store";
import { KaraokeLive } from "./KaraokeLive";
import { LyricsEditor } from "./LyricsEditor";
import { useKaraokeLyrics } from "./useKaraokeLyrics";

export function KaraokePage() {
  const track = useCurrentTrack();
  const lyrics = useKaraokeLyrics(track);
  const [editing, setEditing] = useState(false);
  useEffect(() => setEditing(false), [track?.id]);
  const label = lyrics.lines.length > 0 ? "Modifier la synchronisation" : "Synchroniser";
  return (
    <div>
      <PageHeader
        eyebrow="Paroles"
        title="Karaoké"
        description="Paroles locales (.lrc, .txt ou synchronisées dans Kalo), sans envoi réseau."
        actions={track && !editing && !lyrics.loading ? (
          <Button variant="outline" size="sm" onClick={() => setEditing(true)}>
            <Timer size={15} aria-hidden /> {label}
          </Button>
        ) : null}
      />
      <Card className="p-5">
        {editing && track ? (
          <LyricsEditor track={track} source={lyrics.source} onDone={() => { setEditing(false); lyrics.reload(); }} />
        ) : (
          <KaraokeLive track={track} lyrics={lyrics} />
        )}
      </Card>
    </div>
  );
}
