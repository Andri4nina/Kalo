-- Téléchargements autorisés. Le fichier partiel vit dans le dossier de données
-- de Kalo ; seul un fichier audio vérifié est copié dans la bibliothèque.
CREATE TABLE downloads (
    id INTEGER PRIMARY KEY,
    url TEXT NOT NULL,
    file_name TEXT NOT NULL,
    provider TEXT NOT NULL,
    license TEXT,
    expected_md5 TEXT,
    root_id INTEGER NOT NULL REFERENCES library_roots(id) ON DELETE CASCADE,
    status TEXT NOT NULL,
    received INTEGER NOT NULL DEFAULT 0,
    total INTEGER,
    error TEXT,
    created_at INTEGER NOT NULL DEFAULT (unixepoch()),
    finished_at INTEGER
);
