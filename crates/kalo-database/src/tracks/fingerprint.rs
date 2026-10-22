use rusqlite::{params, Connection};

use crate::DbResult;

/// A present file that shares its size with another track and has no fresh hash.
pub struct HashCandidate {
    pub id: i64,
    pub path: String,
    pub mtime: Option<i64>,
}

/// Only same-size files can be identical: the others are never read.
pub fn hash_candidates(conn: &Connection) -> DbResult<Vec<HashCandidate>> {
    let mut stmt = conn.prepare(
        "SELECT id, path, mtime FROM tracks
         WHERE is_missing = 0 AND size_bytes IS NOT NULL
           AND (content_hash IS NULL OR hashed_mtime IS NOT mtime)
           AND size_bytes IN (
             SELECT size_bytes FROM tracks
             WHERE is_missing = 0 AND size_bytes IS NOT NULL
             GROUP BY size_bytes HAVING COUNT(*) > 1)
         ORDER BY size_bytes, id",
    )?;
    let rows = stmt.query_map([], |row| {
        Ok(HashCandidate {
            id: row.get(0)?,
            path: row.get(1)?,
            mtime: row.get(2)?,
        })
    })?;
    Ok(rows.collect::<rusqlite::Result<Vec<_>>>()?)
}

/// Stores a hash with the modification time it was computed for.
pub fn set_content_hash(conn: &Connection, id: i64, hash: &str, mtime: Option<i64>) -> DbResult<()> {
    conn.execute(
        "UPDATE tracks SET content_hash = ?1, hashed_mtime = ?2 WHERE id = ?3",
        params![hash, mtime, id],
    )?;
    Ok(())
}
