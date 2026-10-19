use kalo_core::Track;
use rusqlite::Connection;

use crate::{tracks::select, DbResult};

pub fn list_tracks(conn: &Connection, playlist_id: i64) -> DbResult<Vec<Track>> {
    let sql = format!(
        "SELECT {} {} JOIN playlist_tracks pt ON pt.track_id = t.id \
         WHERE pt.playlist_id = ?1 ORDER BY pt.position, pt.added_at",
        select::COLUMNS,
        select::FROM
    );
    let mut stmt = conn.prepare(&sql)?;
    let rows = stmt.query_map([playlist_id], select::map)?;
    Ok(rows.collect::<rusqlite::Result<Vec<_>>>()?)
}
