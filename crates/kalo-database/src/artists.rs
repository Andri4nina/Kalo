use rusqlite::Connection;

use crate::DbResult;

pub fn ensure(conn: &Connection, name: &str) -> DbResult<i64> {
    Ok(conn.query_row(
        "INSERT INTO artists (name) VALUES (?1)
         ON CONFLICT(name) DO UPDATE SET name = excluded.name
         RETURNING id",
        [name.trim()],
        |row| row.get(0),
    )?)
}
