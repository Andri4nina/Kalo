use kalo_core::DownloadEntry;
use rusqlite::{Connection, OptionalExtension, Row};

use crate::{DbError, DbResult};

const COLUMNS: &str = "id, url, file_name, provider, license, root_id, status, received, total, error, created_at";

fn map(row: &Row<'_>) -> rusqlite::Result<DownloadEntry> {
    Ok(DownloadEntry {
        id: row.get(0)?,
        url: row.get(1)?,
        file_name: row.get(2)?,
        provider: row.get(3)?,
        license: row.get(4)?,
        root_id: row.get(5)?,
        status: row.get(6)?,
        received: row.get(7)?,
        total: row.get(8)?,
        error: row.get(9)?,
        created_at: row.get(10)?,
    })
}

pub fn list(conn: &Connection) -> DbResult<Vec<DownloadEntry>> {
    let mut stmt = conn.prepare(&format!(
        "SELECT {COLUMNS} FROM downloads ORDER BY created_at DESC, id DESC LIMIT 500"
    ))?;
    let rows = stmt.query_map([], map)?;
    Ok(rows.collect::<rusqlite::Result<Vec<_>>>()?)
}

pub fn get(conn: &Connection, id: i64) -> DbResult<DownloadEntry> {
    conn.query_row(&format!("SELECT {COLUMNS} FROM downloads WHERE id = ?1"), [id], map)
        .optional()?
        .ok_or_else(|| DbError::NotFound(format!("téléchargement {id}")))
}

/// Checksum published by the source, if any.
pub fn expected_md5(conn: &Connection, id: i64) -> DbResult<Option<String>> {
    Ok(conn
        .query_row("SELECT expected_md5 FROM downloads WHERE id = ?1", [id], |row| {
            row.get(0)
        })
        .optional()?
        .flatten())
}
