use kalo_core::Track;
use rusqlite::{params, Connection};

use crate::{tracks::select, DbResult};

pub fn record_play(conn: &Connection, track_id: i64) -> DbResult<()> {
    conn.execute("INSERT INTO play_history (track_id) VALUES (?1)", [track_id])?;
    Ok(())
}

pub fn recent(conn: &Connection, limit: i64) -> DbResult<Vec<Track>> {
    let sql = format!(
        "SELECT {} {} \
         JOIN (SELECT track_id, MAX(played_at) AS last_played FROM play_history GROUP BY track_id) h \
         ON h.track_id = t.id \
         WHERE t.is_missing = 0 \
         ORDER BY h.last_played DESC LIMIT ?1",
        select::COLUMNS,
        select::FROM
    );
    let mut stmt = conn.prepare(&sql)?;
    let rows = stmt.query_map(params![limit.clamp(1, 50)], select::map)?;
    Ok(rows.collect::<rusqlite::Result<Vec<_>>>()?)
}
