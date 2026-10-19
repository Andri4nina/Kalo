CREATE TABLE artists (
    id INTEGER PRIMARY KEY,
    name TEXT NOT NULL COLLATE NOCASE UNIQUE
);

CREATE TABLE albums (
    id INTEGER PRIMARY KEY,
    title TEXT NOT NULL COLLATE NOCASE,
    artist_id INTEGER REFERENCES artists(id) ON DELETE SET NULL,
    year INTEGER
);

CREATE UNIQUE INDEX idx_albums_title_artist ON albums(title, IFNULL(artist_id, 0));

CREATE TABLE tracks (
    id INTEGER PRIMARY KEY,
    path TEXT NOT NULL UNIQUE,
    root_id INTEGER NOT NULL REFERENCES library_roots(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    artist_id INTEGER REFERENCES artists(id) ON DELETE SET NULL,
    album_id INTEGER REFERENCES albums(id) ON DELETE SET NULL,
    genre TEXT,
    year INTEGER,
    track_no INTEGER,
    disc_no INTEGER,
    duration_ms INTEGER NOT NULL DEFAULT 0,
    format TEXT NOT NULL,
    bitrate INTEGER,
    sample_rate INTEGER,
    channels INTEGER,
    size_bytes INTEGER,
    mtime INTEGER,
    cover_path TEXT,
    is_missing INTEGER NOT NULL DEFAULT 0,
    scan_mark INTEGER NOT NULL DEFAULT 0,
    added_at INTEGER NOT NULL DEFAULT (unixepoch()),
    updated_at INTEGER NOT NULL DEFAULT (unixepoch())
);
