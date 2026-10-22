use kalo_core::Playlist;
use rusqlite::{params, Connection};

use crate::{DbError, DbResult};

use super::entries;

const MAX_DESCRIPTION: usize = 500;

/// Updates the free-text description (trimmed, 500 characters at most).
pub fn update_details(conn: &Connection, id: i64, description: &str) -> DbResult<Playlist> {
    let description = description.trim();
    if description.chars().count() > MAX_DESCRIPTION {
        return Err(DbError::Invalid("La description est trop longue.".into()));
    }
    let changed = conn.execute(
        "UPDATE playlists SET description = ?1, updated_at = unixepoch() WHERE id = ?2",
        params![description, id],
    )?;
    if changed == 0 {
        return Err(DbError::NotFound(format!("playlist {id}")));
    }
    entries::get(conn, id)
}

/// Points the playlist at a cached cover, or clears it with `None`.
pub fn set_cover(conn: &Connection, id: i64, cover: Option<&str>) -> DbResult<Playlist> {
    let changed = conn.execute(
        "UPDATE playlists SET cover_path = ?1, updated_at = unixepoch() WHERE id = ?2",
        params![cover, id],
    )?;
    if changed == 0 {
        return Err(DbError::NotFound(format!("playlist {id}")));
    }
    entries::get(conn, id)
}
