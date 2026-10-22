import { HashRouter, Route, Routes } from "react-router-dom";
import { AppShell } from "@/app/AppShell";
import { NotFoundPage } from "@/app/NotFoundPage";
import { settingsRoutes } from "@/app/settingsRoutes";
import { AlbumDetailPage } from "@/features/albums/AlbumDetailPage";
import { AlbumsPage } from "@/features/albums/AlbumsPage";
import { ArtistDetailPage } from "@/features/artists/ArtistDetailPage";
import { ArtistsPage } from "@/features/artists/ArtistsPage";
import { DownloadsPage } from "@/features/downloads/DownloadsPage";
import { DuplicatesPage } from "@/features/duplicates/DuplicatesPage";
import { FavoritesPage } from "@/features/favorites/FavoritesPage";
import { HomePage } from "@/features/home/HomePage";
import { KaraokePage } from "@/features/karaoke/KaraokePage";
import { LibraryPage } from "@/features/library/LibraryPage";
import { PlaylistDetailPage } from "@/features/playlists/PlaylistDetailPage";
import { PlaylistsPage } from "@/features/playlists/PlaylistsPage";
import { StemStudioPage } from "@/features/stems/StemStudioPage";
import { StudioPage } from "@/features/studio/StudioPage";
import { VideosPage } from "@/features/videos/VideosPage";

export function App() {
  return (
    <HashRouter>
      <Routes>
        <Route element={<AppShell />}>
          <Route index element={<HomePage />} />
          <Route path="library" element={<LibraryPage />} />
          <Route path="duplicates" element={<DuplicatesPage />} />
          <Route path="downloads" element={<DownloadsPage />} />
          <Route path="artists" element={<ArtistsPage />} />
          <Route path="artists/:artistId" element={<ArtistDetailPage />} />
          <Route path="albums" element={<AlbumsPage />} />
          <Route path="albums/:albumId" element={<AlbumDetailPage />} />
          <Route path="playlists" element={<PlaylistsPage />} />
          <Route path="playlists/:playlistId" element={<PlaylistDetailPage />} />
          <Route path="favorites" element={<FavoritesPage />} />
          <Route path="videos" element={<VideosPage />} />
          <Route path="karaoke" element={<KaraokePage />} />
          <Route path="studio" element={<StudioPage />} />
          <Route path="stems" element={<StemStudioPage />} />
          {settingsRoutes()}
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </HashRouter>
  );
}
