use rusqlite::{params, Connection};

use crate::DbResult;

/// Keeps an existing row alive when its file was seen but could not be parsed.
pub fn touch_seen(conn: &Connection, path: &str, mark: i64) -> DbResult<()> {
    conn.execute(
        "UPDATE tracks SET scan_mark = ?1, is_missing = 0 WHERE path = ?2",
        params![mark, path],
    )?;
    Ok(())
}

/// Marks tracks under a root that were not seen during the current scan.
pub fn finish_scan(conn: &Connection, root_id: i64, mark: i64) -> DbResult<i64> {
    let changed = conn.execute(
        "UPDATE tracks SET is_missing = 1, updated_at = unixepoch()
         WHERE root_id = ?1 AND scan_mark <> ?2 AND is_missing = 0",
        params![root_id, mark],
    )?;
    Ok(changed as i64)
}
