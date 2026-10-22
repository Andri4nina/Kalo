import { Clapperboard } from "lucide-react";
import { useDeferredValue, useState } from "react";
import { Card } from "@/components/Card";
import { EmptyState } from "@/components/EmptyState";
import { ErrorNotice } from "@/components/ErrorNotice";
import { PageHeader } from "@/components/PageHeader";
import { SearchField } from "@/components/SearchField";
import { Spinner } from "@/components/Spinner";
import { mediaGrid } from "@/design/tokens";
import { useLibraryVersion } from "@/features/library/library.store";
import { listVideos } from "@/lib/api/videos";
import { useAsync } from "@/lib/useAsync";
import type { Video } from "@/types";
import { VideoCard } from "./VideoCard";
import { VideoPlayerModal } from "./VideoPlayerModal";

export function VideosPage() {
  const version = useLibraryVersion((state) => state.version);
  const [search, setSearch] = useState("");
  const query = useDeferredValue(search.trim());
  const { data, loading, error } = useAsync(() => listVideos(query || null), [query, version]);
  const [playing, setPlaying] = useState<Video | null>(null);
  return (
    <div>
      <PageHeader eyebrow="Collection" title="Clips" description="Vidéos MP4, M4V et WebM trouvées dans vos dossiers, lues sur place." />
      <SearchField value={search} onChange={setSearch} placeholder="Rechercher un clip ou un artiste" label="Rechercher un clip" className="mb-4 max-w-sm" />
      {error ? <ErrorNotice message={error} /> : null}
      {loading && !data ? <Spinner label="Chargement des clips" /> : null}
      {data && data.length === 0 ? (
        <Card>
          <EmptyState icon={Clapperboard} title="Aucun clip" description="Les vidéos de vos dossiers apparaissent ici après une analyse. Importez un clip pour le classer dans Artiste/video." />
        </Card>
      ) : null}
      {data && data.length > 0 ? (
        <div className={mediaGrid}>
          {data.map((video) => <VideoCard key={video.id} video={video} onOpen={() => setPlaying(video)} />)}
        </div>
      ) : null}
      {playing ? <VideoPlayerModal video={playing} onClose={() => setPlaying(null)} /> : null}
    </div>
  );
}
