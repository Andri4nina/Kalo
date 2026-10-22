-- Paroles éditées ou synchronisées dans Kalo. Les fichiers .lrc/.txt voisins
-- de l'audio ne sont jamais modifiés : cette table a priorité sur eux.
CREATE TABLE lyrics (
    track_id INTEGER PRIMARY KEY REFERENCES tracks(id) ON DELETE CASCADE,
    content TEXT NOT NULL,
    updated_at INTEGER NOT NULL DEFAULT (unixepoch())
);
