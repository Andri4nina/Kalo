use kalo_core::Playlist;
use rusqlite::{Connection, OptionalExtension, Row};

use crate::{DbError, DbResult};

const COLUMNS: &str = "p.id, p.name, p.description, p.cover_path, \
    (SELECT COUNT(*) FROM playlist_tracks pt WHERE pt.playlist_id = p.id), \
    p.created_at, p.updated_at";

fn map(row: &Row<'_>) -> rusqlite::Result<Playlist> {
    Ok(Playlist {
        id: row.get(0)?,
        name: row.get(1)?,
        description: row.get(2)?,
        cover_path: row.get(3)?,
        track_count: row.get(4)?,
        created_at: row.get(5)?,
        updated_at: row.get(6)?,
    })
}

pub fn list(conn: &Connection) -> DbResult<Vec<Playlist>> {
    let mut stmt = conn.prepare(&format!(
        "SELECT {COLUMNS} FROM playlists p ORDER BY p.created_at DESC, p.id DESC"
    ))?;
    let rows = stmt.query_map([], map)?;
    Ok(rows.collect::<rusqlite::Result<Vec<_>>>()?)
}

pub fn get(conn: &Connection, id: i64) -> DbResult<Playlist> {
    conn.query_row(&format!("SELECT {COLUMNS} FROM playlists p WHERE p.id = ?1"), [id], map)
        .optional()?
        .ok_or_else(|| DbError::NotFound(format!("playlist {id}")))
}
