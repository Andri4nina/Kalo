-- Tâches de séparation des instruments. Les pistes produites sont des fichiers
-- de Kalo (dossier de données), jamais les originaux de l'utilisateur.
CREATE TABLE stem_jobs (
    id INTEGER PRIMARY KEY,
    track_id INTEGER NOT NULL REFERENCES tracks(id) ON DELETE CASCADE,
    status TEXT NOT NULL,
    error TEXT,
    output_dir TEXT,
    created_at INTEGER NOT NULL DEFAULT (unixepoch()),
    finished_at INTEGER
);

CREATE INDEX idx_stem_jobs_track ON stem_jobs(track_id);
