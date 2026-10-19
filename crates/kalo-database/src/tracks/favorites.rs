use rusqlite::Connection;

use crate::DbResult;

pub fn toggle_favorite(conn: &Connection, track_id: i64) -> DbResult<bool> {
    let exists: bool = conn.query_row(
        "SELECT EXISTS(SELECT 1 FROM favorites WHERE track_id = ?1)",
        [track_id],
        |row| row.get(0),
    )?;
    if exists {
        conn.execute("DELETE FROM favorites WHERE track_id = ?1", [track_id])?;
    } else {
        conn.execute("INSERT INTO favorites (track_id) VALUES (?1)", [track_id])?;
    }
    Ok(!exists)
}
