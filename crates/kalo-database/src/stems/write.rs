use rusqlite::{params, Connection, OptionalExtension};

use crate::{DbError, DbResult};

pub fn create(conn: &Connection, track_id: i64) -> DbResult<i64> {
    conn.query_row("SELECT 1 FROM tracks WHERE id = ?1", [track_id], |_| Ok(()))
        .optional()?
        .ok_or_else(|| DbError::NotFound(format!("morceau {track_id}")))?;
    Ok(conn.query_row(
        "INSERT INTO stem_jobs (track_id, status) VALUES (?1, 'running') RETURNING id",
        [track_id],
        |row| row.get(0),
    )?)
}

/// Records the end of a job; `output_dir` is set only for a finished job.
pub fn finish(conn: &Connection, id: i64, status: &str, error: Option<&str>, output_dir: Option<&str>) -> DbResult<()> {
    conn.execute(
        "UPDATE stem_jobs SET status = ?2, error = ?3, output_dir = ?4, finished_at = unixepoch() WHERE id = ?1",
        params![id, status, error, output_dir],
    )?;
    Ok(())
}

/// Removes a job row and returns its output folder, for Kalo to delete.
pub fn delete(conn: &Connection, id: i64) -> DbResult<Option<String>> {
    let output: Option<Option<String>> = conn
        .query_row("SELECT output_dir FROM stem_jobs WHERE id = ?1", [id], |row| row.get(0))
        .optional()?;
    let output = output.ok_or_else(|| DbError::NotFound(format!("séparation {id}")))?;
    conn.execute("DELETE FROM stem_jobs WHERE id = ?1", [id])?;
    Ok(output)
}

/// Jobs left running by a closed application are marked as interrupted.
pub fn mark_interrupted(conn: &Connection) -> DbResult<usize> {
    Ok(conn.execute(
        "UPDATE stem_jobs SET status = 'failed', error = 'Interrompue par la fermeture de Kalo.', finished_at = unixepoch() WHERE status = 'running'",
        [],
    )?)
}
