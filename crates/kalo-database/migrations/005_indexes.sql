CREATE INDEX idx_tracks_artist ON tracks(artist_id);
CREATE INDEX idx_tracks_album ON tracks(album_id);
CREATE INDEX idx_tracks_root ON tracks(root_id);
CREATE INDEX idx_tracks_added ON tracks(added_at DESC);
CREATE INDEX idx_tracks_scan_mark ON tracks(root_id, scan_mark);
CREATE INDEX idx_playlist_tracks_position ON playlist_tracks(playlist_id, position);
CREATE INDEX idx_history_played ON play_history(played_at DESC);
