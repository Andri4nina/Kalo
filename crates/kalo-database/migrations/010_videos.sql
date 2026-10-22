-- Clips vidéo locaux, indexés à part de la musique. Le fichier reste en place.
CREATE TABLE videos (
    id INTEGER PRIMARY KEY,
    path TEXT NOT NULL UNIQUE,
    root_id INTEGER NOT NULL REFERENCES library_roots(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    artist TEXT,
    duration_ms INTEGER NOT NULL DEFAULT 0,
    format TEXT NOT NULL,
    is_missing INTEGER NOT NULL DEFAULT 0,
    scan_mark INTEGER NOT NULL DEFAULT 0,
    added_at INTEGER NOT NULL DEFAULT (unixepoch())
);

CREATE INDEX idx_videos_root ON videos(root_id, scan_mark);
