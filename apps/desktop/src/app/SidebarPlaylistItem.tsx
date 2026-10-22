import { NavLink } from "react-router-dom";
import { focus, muted } from "@/design/tokens";
import { PlaylistArtwork } from "@/features/playlists/PlaylistArtwork";
import { cn } from "@/lib/cn";
import type { Playlist } from "@/types";

export function SidebarPlaylistItem({ playlist }: { playlist: Playlist }) {
  const count = `${playlist.trackCount} morceau${playlist.trackCount > 1 ? "x" : ""}`;
  return (
    <NavLink
      to={`/playlists/${playlist.id}`}
      title={playlist.name}
      className={({ isActive }) =>
        cn(
          "flex items-center justify-center gap-3 rounded-md p-1.5 transition-colors lg:justify-start",
          isActive ? "bg-kalo-raised dark:bg-kalo-dark-raised" : "hover:bg-kalo-raised/70 dark:hover:bg-kalo-dark-raised/70",
          focus,
        )
      }
    >
      {({ isActive }) => (
        <>
          <PlaylistArtwork size="tile" />
          <span className="hidden min-w-0 lg:block">
            <span className={cn("block truncate text-sm font-semibold", isActive && "text-kalo-accent-strong dark:text-kalo-dark-accent")}>
              {playlist.name}
            </span>
            <span className={cn("block truncate text-xs", muted)}>Playlist · {count}</span>
          </span>
        </>
      )}
    </NavLink>
  );
}
