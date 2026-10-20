use kalo_core::AlbumSummary;
use rusqlite::{params, Connection, OptionalExtension};

use crate::DbResult;

const SQL: &str = "SELECT al.id, al.title, ar.name, al.year, COUNT(t.id), \
    (SELECT c.cover_path FROM tracks c WHERE c.album_id = al.id AND c.cover_path IS NOT NULL LIMIT 1) \
    FROM albums al LEFT JOIN tracks t ON t.album_id = al.id \
    LEFT JOIN artists ar ON ar.id = al.artist_id \
    WHERE al.id = ?1 GROUP BY al.id";

pub fn get(conn: &Connection, id: i64) -> DbResult<Option<AlbumSummary>> {
    Ok(conn
        .query_row(SQL, params![id], |row| {
            Ok(AlbumSummary {
                id: row.get(0)?,
                title: row.get(1)?,
                artist: row.get(2)?,
                year: row.get(3)?,
                track_count: row.get(4)?,
                cover_path: row.get(5)?,
            })
        })
        .optional()?)
}
