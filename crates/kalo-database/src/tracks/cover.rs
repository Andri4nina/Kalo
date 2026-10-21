use rusqlite::{params, Connection};

use crate::DbResult;

pub fn set_cover(conn: &Connection, track_id: i64, cover_path: &str) -> DbResult<bool> {
    let changed = conn.execute(
        "UPDATE tracks SET cover_path = ?2, updated_at = unixepoch() WHERE id = ?1",
        params![track_id, cover_path],
    )?;
    Ok(changed > 0)
}
