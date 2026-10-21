use rusqlite::{params, Connection, OptionalExtension};

use crate::DbResult;

pub fn find_path(conn: &Connection, track_id: i64) -> DbResult<Option<String>> {
    Ok(conn
        .query_row("SELECT path FROM tracks WHERE id = ?1", params![track_id], |row| {
            row.get(0)
        })
        .optional()?)
}

pub fn find_id_by_path(conn: &Connection, path: &str) -> DbResult<Option<i64>> {
    Ok(conn
        .query_row("SELECT id FROM tracks WHERE path = ?1", params![path], |row| row.get(0))
        .optional()?)
}
