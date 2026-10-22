use rusqlite::{params, Connection};

use crate::DbResult;

pub fn progress(conn: &Connection, id: i64, received: u64, total: Option<u64>) -> DbResult<()> {
    conn.execute(
        "UPDATE downloads SET received = ?2, total = ?3, status = 'running' WHERE id = ?1",
        params![id, received as i64, total.map(|value| value as i64)],
    )?;
    Ok(())
}

/// Final or paused state; `error` explains a failure.
pub fn set_status(conn: &Connection, id: i64, status: &str, error: Option<&str>) -> DbResult<()> {
    conn.execute(
        "UPDATE downloads SET status = ?2, error = ?3,
           finished_at = CASE WHEN ?2 IN ('done', 'failed', 'cancelled') THEN unixepoch() ELSE NULL END
         WHERE id = ?1",
        params![id, status, error],
    )?;
    Ok(())
}

/// Transfers cut by a closed application become paused, ready to resume.
pub fn pause_interrupted(conn: &Connection) -> DbResult<usize> {
    Ok(conn.execute(
        "UPDATE downloads SET status = 'paused' WHERE status IN ('running', 'queued')",
        [],
    )?)
}
