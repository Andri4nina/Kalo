use kalo_core::AlbumSummary;
use rusqlite::{params, Connection};

use crate::DbResult;

const SQL: &str = "SELECT al.id, al.title, ar.name, al.year, COUNT(t.id), \
    (SELECT c.cover_path FROM tracks c WHERE c.album_id = al.id AND c.cover_path IS NOT NULL LIMIT 1) \
    FROM albums al JOIN tracks t ON t.album_id = al.id \
    LEFT JOIN artists ar ON ar.id = al.artist_id \
    GROUP BY al.id ORDER BY al.title COLLATE NOCASE";

pub fn list(conn: &Connection) -> DbResult<Vec<AlbumSummary>> {
    let mut stmt = conn.prepare(SQL)?;
    let rows = stmt.query_map(params![], |row| {
        Ok(AlbumSummary {
            id: row.get(0)?,
            title: row.get(1)?,
            artist: row.get(2)?,
            year: row.get(3)?,
            track_count: row.get(4)?,
            cover_path: row.get(5)?,
        })
    })?;
    Ok(rows.collect::<rusqlite::Result<Vec<_>>>()?)
}
