use rusqlite::{params, Connection, OptionalExtension};

use crate::DbResult;

mod get;
mod list;
mod tracks;

pub use get::get;
pub use list::list;
pub use tracks::page;

pub fn ensure(conn: &Connection, title: &str, artist_id: i64, year: Option<i64>) -> DbResult<i64> {
    let existing: Option<i64> = conn
        .query_row(
            "SELECT id FROM albums WHERE title = ?1 AND IFNULL(artist_id, 0) = ?2",
            params![title.trim(), artist_id],
            |row| row.get(0),
        )
        .optional()?;
    if let Some(id) = existing {
        return Ok(id);
    }
    Ok(conn.query_row(
        "INSERT INTO albums (title, artist_id, year) VALUES (?1, ?2, ?3) RETURNING id",
        params![title.trim(), artist_id, year],
        |row| row.get(0),
    )?)
}
