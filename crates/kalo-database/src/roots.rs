use kalo_core::LibraryRoot;
use rusqlite::{params, Connection, OptionalExtension};

use crate::{DbError, DbResult};

mod model;

use model::{map, COLUMNS};

pub fn list(conn: &Connection) -> DbResult<Vec<LibraryRoot>> {
    let mut stmt = conn.prepare(&format!(
        "SELECT {COLUMNS} FROM library_roots ORDER BY path COLLATE NOCASE"
    ))?;
    let rows = stmt.query_map([], map)?;
    Ok(rows.collect::<rusqlite::Result<Vec<_>>>()?)
}

pub fn get(conn: &Connection, id: i64) -> DbResult<LibraryRoot> {
    conn.query_row(&format!("SELECT {COLUMNS} FROM library_roots WHERE id = ?1"), [id], map)
        .optional()?
        .ok_or_else(|| DbError::NotFound(format!("dossier {id}")))
}

pub fn add(conn: &Connection, path: &str) -> DbResult<LibraryRoot> {
    let id: i64 = conn.query_row(
        "INSERT INTO library_roots (path) VALUES (?1)
         ON CONFLICT(path) DO UPDATE SET path = excluded.path
         RETURNING id",
        [path],
        |row| row.get(0),
    )?;
    get(conn, id)
}

pub fn remove(conn: &Connection, id: i64) -> DbResult<()> {
    let changed = conn.execute("DELETE FROM library_roots WHERE id = ?1", [id])?;
    if changed == 0 {
        return Err(DbError::NotFound(format!("dossier {id}")));
    }
    Ok(())
}

pub fn touch_scan(conn: &Connection, id: i64) -> DbResult<()> {
    conn.execute(
        "UPDATE library_roots SET last_scan_at = unixepoch() WHERE id = ?1",
        params![id],
    )?;
    Ok(())
}
