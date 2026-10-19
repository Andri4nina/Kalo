CREATE TABLE library_roots (
    id INTEGER PRIMARY KEY,
    path TEXT NOT NULL UNIQUE,
    added_at INTEGER NOT NULL DEFAULT (unixepoch()),
    last_scan_at INTEGER
);
