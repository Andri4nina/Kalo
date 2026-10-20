use kalo_core::ArtistSummary;
use rusqlite::{params, Connection, OptionalExtension};

use crate::DbResult;

const SQL: &str = "SELECT ar.id, ar.name, COUNT(t.id), COUNT(DISTINCT t.album_id) \
    FROM artists ar LEFT JOIN tracks t ON t.artist_id = ar.id \
    WHERE ar.id = ?1 GROUP BY ar.id";

pub fn get(conn: &Connection, id: i64) -> DbResult<Option<ArtistSummary>> {
    Ok(conn
        .query_row(SQL, params![id], |row| {
            Ok(ArtistSummary {
                id: row.get(0)?,
                name: row.get(1)?,
                track_count: row.get(2)?,
                album_count: row.get(3)?,
            })
        })
        .optional()?)
}
