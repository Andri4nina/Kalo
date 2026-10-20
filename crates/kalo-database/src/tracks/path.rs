use rusqlite::{params, Connection, OptionalExtension};

use crate::DbResult;

pub fn find_path(conn: &Connection, track_id: i64) -> DbResult<Option<String>> {
    Ok(conn
        .query_row("SELECT path FROM tracks WHERE id = ?1", params![track_id], |row| {
            row.get(0)
        })
        .optional()?)
}
