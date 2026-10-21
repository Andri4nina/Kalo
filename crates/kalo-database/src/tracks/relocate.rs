use rusqlite::{params, Connection};

use crate::{DbError, DbResult};

pub fn relocate(conn: &Connection, track_id: i64, new_path: &str, root_id: i64) -> DbResult<bool> {
    let conflict: bool = conn.query_row(
        "SELECT EXISTS(SELECT 1 FROM tracks WHERE path = ?1 AND id <> ?2)",
        params![new_path, track_id],
        |row| row.get(0),
    )?;
    if conflict {
        return Err(DbError::Invalid("Un autre morceau utilise déjà ce fichier.".into()));
    }
    let changed = conn.execute(
        "UPDATE tracks SET path = ?2, root_id = ?3, is_missing = 0, updated_at = unixepoch() WHERE id = ?1",
        params![track_id, new_path, root_id],
    )?;
    Ok(changed > 0)
}
