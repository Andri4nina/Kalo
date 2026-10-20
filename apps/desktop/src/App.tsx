import { HashRouter, Route, Routes } from "react-router-dom";
import { AppShell } from "@/app/AppShell";
import { NotFoundPage } from "@/app/NotFoundPage";
import { AlbumDetailPage } from "@/features/albums/AlbumDetailPage";
import { AlbumsPage } from "@/features/albums/AlbumsPage";
import { ArtistDetailPage } from "@/features/artists/ArtistDetailPage";
import { ArtistsPage } from "@/features/artists/ArtistsPage";
import { FavoritesPage } from "@/features/favorites/FavoritesPage";
import { HomePage } from "@/features/home/HomePage";
import { LibraryPage } from "@/features/library/LibraryPage";
import { PlaylistDetailPage } from "@/features/playlists/PlaylistDetailPage";
import { PlaylistsPage } from "@/features/playlists/PlaylistsPage";
import { SettingsPage } from "@/features/settings/SettingsPage";

export function App() {
  return (
    <HashRouter>
      <Routes>
        <Route element={<AppShell />}>
          <Route index element={<HomePage />} />
          <Route path="library" element={<LibraryPage />} />
          <Route path="artists" element={<ArtistsPage />} />
          <Route path="artists/:artistId" element={<ArtistDetailPage />} />
          <Route path="albums" element={<AlbumsPage />} />
          <Route path="albums/:albumId" element={<AlbumDetailPage />} />
          <Route path="playlists" element={<PlaylistsPage />} />
          <Route path="playlists/:playlistId" element={<PlaylistDetailPage />} />
          <Route path="favorites" element={<FavoritesPage />} />
          <Route path="settings" element={<SettingsPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </HashRouter>
  );
}
