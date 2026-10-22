ALTER TABLE tracks ADD COLUMN content_hash TEXT;
ALTER TABLE tracks ADD COLUMN hashed_mtime INTEGER;
CREATE INDEX idx_tracks_content_hash ON tracks(content_hash);
CREATE INDEX idx_tracks_size ON tracks(size_bytes);
