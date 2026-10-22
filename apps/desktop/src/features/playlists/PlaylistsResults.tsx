import { ListMusic, SearchX } from "lucide-react";
import { Card } from "@/components/Card";
import { EmptyState } from "@/components/EmptyState";
import type { Playlist } from "@/types";
import { PlaylistsGrid } from "./PlaylistsGrid";
import { filterPlaylists } from "./playlist.search";

/** Grille filtrée, avec un état vide distinct de l'absence de résultat. */
export function PlaylistsResults({ playlists, query }: { playlists: Playlist[]; query: string }) {
  if (playlists.length === 0) {
    return (
      <Card>
        <EmptyState
          icon={ListMusic}
          title="Aucune playlist"
          description="Créez une playlist puis ajoutez-y des morceaux depuis la bibliothèque."
        />
      </Card>
    );
  }
  const visible = filterPlaylists(playlists, query);
  if (visible.length === 0) {
    return (
      <Card>
        <EmptyState icon={SearchX} title="Aucun résultat" description="Aucune playlist ne correspond à cette recherche." />
      </Card>
    );
  }
  return <PlaylistsGrid playlists={visible} />;
}
