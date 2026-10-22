use kalo_core::StemJob;
use rusqlite::{Connection, OptionalExtension, Row};

use crate::{DbError, DbResult};

const SELECT: &str =
    "SELECT j.id, j.track_id, t.path, t.title, a.name, j.status, j.error, j.output_dir, j.created_at, j.finished_at
    FROM stem_jobs j JOIN tracks t ON t.id = j.track_id LEFT JOIN artists a ON a.id = t.artist_id";

fn map(row: &Row<'_>) -> rusqlite::Result<StemJob> {
    Ok(StemJob {
        id: row.get(0)?,
        track_id: row.get(1)?,
        track_path: row.get(2)?,
        title: row.get(3)?,
        artist: row.get(4)?,
        status: row.get(5)?,
        error: row.get(6)?,
        output_dir: row.get(7)?,
        created_at: row.get(8)?,
        finished_at: row.get(9)?,
    })
}

pub fn list(conn: &Connection) -> DbResult<Vec<StemJob>> {
    let mut stmt = conn.prepare(&format!("{SELECT} ORDER BY j.created_at DESC, j.id DESC"))?;
    let rows = stmt.query_map([], map)?;
    Ok(rows.collect::<rusqlite::Result<Vec<_>>>()?)
}

pub fn get(conn: &Connection, id: i64) -> DbResult<StemJob> {
    conn.query_row(&format!("{SELECT} WHERE j.id = ?1"), [id], map)
        .optional()?
        .ok_or_else(|| DbError::NotFound(format!("séparation {id}")))
}
