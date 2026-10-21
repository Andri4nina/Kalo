use rusqlite::Connection;

use crate::DbResult;

pub fn formats(conn: &Connection) -> DbResult<Vec<String>> {
    let mut stmt =
        conn.prepare("SELECT DISTINCT format FROM tracks WHERE is_missing = 0 ORDER BY format COLLATE NOCASE")?;
    let rows = stmt.query_map([], |row| row.get(0))?;
    Ok(rows.collect::<rusqlite::Result<Vec<_>>>()?)
}
