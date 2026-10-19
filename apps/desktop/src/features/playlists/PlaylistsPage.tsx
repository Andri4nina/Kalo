import { ListMusic, RotateCw } from "lucide-react";
import { Card } from "@/components/Card";
import { EmptyState } from "@/components/EmptyState";
import { ErrorNotice } from "@/components/ErrorNotice";
import { IconButton } from "@/components/IconButton";
import { PageHeader } from "@/components/PageHeader";
import { Spinner } from "@/components/Spinner";
import { useLibraryVersion } from "@/features/library/library.store";
import { listPlaylists } from "@/lib/api/playlists";
import { useAsync } from "@/lib/useAsync";
import { CreatePlaylistForm } from "./CreatePlaylistForm";
import { PlaylistsGrid } from "./PlaylistsGrid";

export function PlaylistsPage() {
  const version = useLibraryVersion((state) => state.version);
  const { data, loading, error, reload } = useAsync(listPlaylists, [version]);
  return (
    <div>
      <PageHeader
        eyebrow="Organisation"
        title="Playlists"
        description="Des sélections persistantes, sans jamais dupliquer vos fichiers."
        actions={<IconButton icon={RotateCw} label="Actualiser" onClick={reload} />}
      />
      <CreatePlaylistForm />
      {error ? <ErrorNotice message={error} /> : null}
      {loading && !data ? <Spinner label="Chargement des playlists" /> : null}
      {data && data.length === 0 ? (
        <Card>
          <EmptyState
            icon={ListMusic}
            title="Aucune playlist"
            description="Créez une playlist puis ajoutez-y des morceaux depuis la bibliothèque."
          />
        </Card>
      ) : null}
      {data && data.length > 0 ? <PlaylistsGrid playlists={data} /> : null}
    </div>
  );
}
