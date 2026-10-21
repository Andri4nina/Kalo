use rusqlite::{params, Connection};

use crate::DbResult;

pub fn remove(conn: &Connection, track_id: i64) -> DbResult<bool> {
    let changed = conn.execute("DELETE FROM tracks WHERE id = ?1", params![track_id])?;
    Ok(changed > 0)
}
