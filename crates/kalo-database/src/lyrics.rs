//! Lyrics edited or synchronised inside Kalo (never written next to the audio).

use rusqlite::{params, Connection, OptionalExtension};

use crate::{DbError, DbResult};

const MAX_CHARS: usize = 200_000;

pub fn get(conn: &Connection, track_id: i64) -> DbResult<Option<String>> {
    Ok(conn
        .query_row("SELECT content FROM lyrics WHERE track_id = ?1", [track_id], |row| {
            row.get(0)
        })
        .optional()?)
}

/// Saves (or replaces) the edited lyrics of a track.
pub fn save(conn: &Connection, track_id: i64, content: &str) -> DbResult<()> {
    if content.trim().is_empty() {
        return Err(DbError::Invalid("Les paroles sont vides.".into()));
    }
    if content.chars().count() > MAX_CHARS {
        return Err(DbError::Invalid("Les paroles sont trop longues.".into()));
    }
    conn.execute(
        "INSERT INTO lyrics (track_id, content) VALUES (?1, ?2)
         ON CONFLICT(track_id) DO UPDATE SET content = excluded.content, updated_at = unixepoch()",
        params![track_id, content],
    )
    .map_err(|error| match error {
        rusqlite::Error::SqliteFailure(failure, _) if failure.code == rusqlite::ErrorCode::ConstraintViolation => {
            DbError::NotFound(format!("morceau {track_id}"))
        }
        other => DbError::Sqlite(other),
    })?;
    Ok(())
}

/// Drops the edited version: the files next to the audio apply again.
pub fn reset(conn: &Connection, track_id: i64) -> DbResult<bool> {
    Ok(conn.execute("DELETE FROM lyrics WHERE track_id = ?1", [track_id])? > 0)
}
