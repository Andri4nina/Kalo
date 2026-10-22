import { Disc3, Heart, ListMusic, Mic2 } from "lucide-react";
import type { LibraryStats } from "@/types";
import { ShortcutTile } from "./ShortcutTile";

const count = (value: number, one: string, many: string) =>
  `${value.toLocaleString("fr-FR")} ${value > 1 ? many : one}`;

export function HomeShortcuts({ stats }: { stats: LibraryStats }) {
  return (
    <nav aria-label="Accès rapide" className="mb-8 grid grid-cols-1 gap-2 sm:grid-cols-2 xl:grid-cols-4">
      <ShortcutTile to="/favorites" icon={Heart} label="Favoris" detail={count(stats.favorites, "morceau aimé", "morceaux aimés")} />
      <ShortcutTile to="/playlists" icon={ListMusic} label="Playlists" detail={count(stats.playlists, "playlist", "playlists")} />
      <ShortcutTile to="/albums" icon={Disc3} label="Albums" detail={count(stats.albums, "album", "albums")} />
      <ShortcutTile to="/artists" icon={Mic2} label="Artistes" detail={count(stats.artists, "artiste", "artistes")} />
    </nav>
  );
}
