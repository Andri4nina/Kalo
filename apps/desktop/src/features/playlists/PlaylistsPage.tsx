import { RotateCw } from "lucide-react";
import { useState } from "react";
import { ErrorNotice } from "@/components/ErrorNotice";
import { IconButton } from "@/components/IconButton";
import { PageHeader } from "@/components/PageHeader";
import { SearchField } from "@/components/SearchField";
import { Spinner } from "@/components/Spinner";
import { useLibraryVersion } from "@/features/library/library.store";
import { listPlaylists } from "@/lib/api/playlists";
import { useAsync } from "@/lib/useAsync";
import { CreatePlaylistForm } from "./CreatePlaylistForm";
import { PlaylistsResults } from "./PlaylistsResults";

export function PlaylistsPage() {
  const version = useLibraryVersion((state) => state.version);
  const { data, loading, error, reload } = useAsync(listPlaylists, [version]);
  const [query, setQuery] = useState("");
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
      {data && data.length > 0 ? (
        <SearchField value={query} onChange={setQuery} placeholder="Rechercher une playlist" label="Rechercher une playlist" className="mb-4 max-w-sm" />
      ) : null}
      {data ? <PlaylistsResults playlists={data} query={query} /> : null}
    </div>
  );
}
