import { HashRouter, Route, Routes } from "react-router-dom";
import { AppShell } from "@/app/AppShell";
import { NotFoundPage } from "@/app/NotFoundPage";
import { AlbumDetailPage } from "@/features/albums/AlbumDetailPage";
import { AlbumsPage } from "@/features/albums/AlbumsPage";
import { ArtistDetailPage } from "@/features/artists/ArtistDetailPage";
import { ArtistsPage } from "@/features/artists/ArtistsPage";
import { DuplicatesPage } from "@/features/duplicates/DuplicatesPage";
import { FavoritesPage } from "@/features/favorites/FavoritesPage";
import { HomePage } from "@/features/home/HomePage";
import { KaraokePage } from "@/features/karaoke/KaraokePage";
import { LibraryPage } from "@/features/library/LibraryPage";
import { PlaylistDetailPage } from "@/features/playlists/PlaylistDetailPage";
import { PlaylistsPage } from "@/features/playlists/PlaylistsPage";
import { SettingsLayout } from "@/features/settings/SettingsLayout";
import { SettingsLibraryPage } from "@/features/settings/SettingsLibraryPage";
import { SettingsPage } from "@/features/settings/SettingsPage";
import { SettingsPrivacyPage } from "@/features/settings/SettingsPrivacyPage";
import { SettingsShortcutsPage } from "@/features/settings/SettingsShortcutsPage";
import { StudioPage } from "@/features/studio/StudioPage";

export function App() {
  return (
    <HashRouter>
      <Routes>
        <Route element={<AppShell />}>
          <Route index element={<HomePage />} />
          <Route path="library" element={<LibraryPage />} />
          <Route path="duplicates" element={<DuplicatesPage />} />
          <Route path="artists" element={<ArtistsPage />} />
          <Route path="artists/:artistId" element={<ArtistDetailPage />} />
          <Route path="albums" element={<AlbumsPage />} />
          <Route path="albums/:albumId" element={<AlbumDetailPage />} />
          <Route path="playlists" element={<PlaylistsPage />} />
          <Route path="playlists/:playlistId" element={<PlaylistDetailPage />} />
          <Route path="favorites" element={<FavoritesPage />} />
          <Route path="karaoke" element={<KaraokePage />} />
          <Route path="studio" element={<StudioPage />} />
          <Route path="settings" element={<SettingsLayout />}>
            <Route index element={<SettingsPage />} />
            <Route path="library" element={<SettingsLibraryPage />} />
            <Route path="privacy" element={<SettingsPrivacyPage />} />
            <Route path="shortcuts" element={<SettingsShortcutsPage />} />
          </Route>
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </HashRouter>
  );
}
