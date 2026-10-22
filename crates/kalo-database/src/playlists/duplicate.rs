use kalo_core::Playlist;
use rusqlite::{params, Connection};

use crate::DbResult;

use super::entries;

const SUFFIX: &str = " (copie)";
const MAX_NAME: usize = 80;

/// Name of a copy, kept within the 80-character limit of playlist names.
pub fn copy_name(name: &str) -> String {
    let keep = MAX_NAME - SUFFIX.chars().count();
    let base: String = name.chars().take(keep).collect();
    format!("{}{SUFFIX}", base.trim_end())
}

/// Copies a playlist (name, description, cover, ordered tracks) in one transaction.
/// Audio files and the source playlist are left untouched.
pub fn duplicate(conn: &Connection, id: i64) -> DbResult<Playlist> {
    let source = entries::get(conn, id)?;
    let transaction = conn.unchecked_transaction()?;
    let new_id: i64 = transaction.query_row(
        "INSERT INTO playlists (name, description, cover_path) VALUES (?1, ?2, ?3) RETURNING id",
        params![copy_name(&source.name), source.description, source.cover_path],
        |row| row.get(0),
    )?;
    transaction.execute(
        "INSERT INTO playlist_tracks (playlist_id, track_id, position)
         SELECT ?1, track_id, position FROM playlist_tracks WHERE playlist_id = ?2",
        params![new_id, id],
    )?;
    transaction.commit()?;
    entries::get(conn, new_id)
}
