use kalo_core::ArtistSummary;
use rusqlite::{params, Connection};

use crate::DbResult;

const SQL: &str = "SELECT ar.id, ar.name, COUNT(t.id), COUNT(DISTINCT t.album_id) \
    FROM artists ar JOIN tracks t ON t.artist_id = ar.id \
    GROUP BY ar.id ORDER BY ar.name COLLATE NOCASE";

pub fn list(conn: &Connection) -> DbResult<Vec<ArtistSummary>> {
    let mut stmt = conn.prepare(SQL)?;
    let rows = stmt.query_map(params![], |row| {
        Ok(ArtistSummary {
            id: row.get(0)?,
            name: row.get(1)?,
            track_count: row.get(2)?,
            album_count: row.get(3)?,
        })
    })?;
    Ok(rows.collect::<rusqlite::Result<Vec<_>>>()?)
}
