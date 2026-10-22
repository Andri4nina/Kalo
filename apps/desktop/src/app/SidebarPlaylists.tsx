import { ListMusic } from "lucide-react";
import { useLibraryVersion } from "@/features/library/library.store";
import { listPlaylists } from "@/lib/api/playlists";
import { muted } from "@/design/tokens";
import { cn } from "@/lib/cn";
import { useAsync } from "@/lib/useAsync";
import { SidebarNavLink } from "./SidebarNavLink";
import { SidebarPlaylistItem } from "./SidebarPlaylistItem";

/** Panneau « Playlists » façon bibliothèque Spotify : accès direct à chaque liste. */
export function SidebarPlaylists() {
  const version = useLibraryVersion((state) => state.version);
  const { data, error } = useAsync(listPlaylists, [version]);
  return (
    <section aria-label="Vos playlists" className="flex min-h-[6.5rem] flex-1 flex-col">
      <SidebarNavLink to="/playlists" label="Playlists" icon={ListMusic} end />
      {error ? (
        <p role="alert" className="mt-2 hidden px-3 text-xs text-kalo-danger dark:text-kalo-dark-danger lg:block">
          Playlists indisponibles : {error}
        </p>
      ) : null}
      {data && data.length === 0 ? (
        <p className={cn("mt-2 hidden px-3 text-xs leading-relaxed lg:block", muted)}>
          Aucune playlist pour l'instant. Créez-en une depuis la page Playlists.
        </p>
      ) : null}
      <ul className="-mx-1 mt-1 flex min-h-0 flex-1 flex-col gap-0.5 overflow-y-auto p-1">
        {data?.map((playlist) => (
          <li key={playlist.id}>
            <SidebarPlaylistItem playlist={playlist} />
          </li>
        ))}
      </ul>
    </section>
  );
}
