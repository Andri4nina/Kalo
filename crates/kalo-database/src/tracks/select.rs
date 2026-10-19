use kalo_core::Track;
use rusqlite::Row;

pub const COLUMNS: &str = "t.id, t.path, t.title, a.name, al.title, t.genre, t.year, \
    t.duration_ms, t.format, t.cover_path, \
    EXISTS(SELECT 1 FROM favorites f WHERE f.track_id = t.id), \
    t.is_missing, t.added_at";

pub const FROM: &str = "FROM tracks t \
    LEFT JOIN artists a ON a.id = t.artist_id \
    LEFT JOIN albums al ON al.id = t.album_id";

pub fn map(row: &Row<'_>) -> rusqlite::Result<Track> {
    Ok(Track {
        id: row.get(0)?,
        path: row.get(1)?,
        title: row.get(2)?,
        artist: row.get(3)?,
        album: row.get(4)?,
        genre: row.get(5)?,
        year: row.get(6)?,
        duration_ms: row.get(7)?,
        format: row.get(8)?,
        cover_path: row.get(9)?,
        favorite: row.get::<_, i64>(10)? != 0,
        is_missing: row.get::<_, i64>(11)? != 0,
        added_at: row.get(12)?,
    })
}
