export interface ArtistSummary {
  id: number;
  name: string;
  trackCount: number;
  albumCount: number;
}

export interface AlbumSummary {
  id: number;
  title: string;
  artist: string | null;
  year: number | null;
  trackCount: number;
  coverPath: string | null;
}
