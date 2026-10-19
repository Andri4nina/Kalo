use kalo_core::Playlist;
use rusqlite::{params, Connection};

use crate::{DbError, DbResult};

use super::entries;

fn validate_name(name: &str) -> DbResult<String> {
    let trimmed = name.trim();
    if trimmed.is_empty() {
        return Err(DbError::Invalid("Le nom de la playlist est vide.".into()));
    }
    if trimmed.chars().count() > 80 {
        return Err(DbError::Invalid("Le nom de la playlist est trop long.".into()));
    }
    Ok(trimmed.to_string())
}

pub fn create(conn: &Connection, name: &str) -> DbResult<Playlist> {
    let name = validate_name(name)?;
    let id: i64 = conn.query_row(
        "INSERT INTO playlists (name) VALUES (?1) RETURNING id",
        [&name],
        |row| row.get(0),
    )?;
    entries::get(conn, id)
}

pub fn rename(conn: &Connection, id: i64, name: &str) -> DbResult<Playlist> {
    let name = validate_name(name)?;
    let changed = conn.execute(
        "UPDATE playlists SET name = ?1, updated_at = unixepoch() WHERE id = ?2",
        params![name, id],
    )?;
    if changed == 0 {
        return Err(DbError::NotFound(format!("playlist {id}")));
    }
    entries::get(conn, id)
}

pub fn delete(conn: &Connection, id: i64) -> DbResult<()> {
    let changed = conn.execute("DELETE FROM playlists WHERE id = ?1", [id])?;
    if changed == 0 {
        return Err(DbError::NotFound(format!("playlist {id}")));
    }
    Ok(())
}
