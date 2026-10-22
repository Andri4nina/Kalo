use kalo_core::Video;
use rusqlite::{Connection, Row};

use crate::{search, DbResult};

const COLUMNS: &str = "id, path, title, artist, duration_ms, format, is_missing, added_at";

fn map(row: &Row<'_>) -> rusqlite::Result<Video> {
    Ok(Video {
        id: row.get(0)?,
        path: row.get(1)?,
        title: row.get(2)?,
        artist: row.get(3)?,
        duration_ms: row.get(4)?,
        format: row.get(5)?,
        is_missing: row.get(6)?,
        added_at: row.get(7)?,
    })
}

pub fn list(conn: &Connection, search_text: Option<&str>) -> DbResult<Vec<Video>> {
    let sql = format!(
        "SELECT {COLUMNS} FROM videos WHERE (?1 IS NULL OR title LIKE ?1 ESCAPE '\\' OR artist LIKE ?1 ESCAPE '\\')
         ORDER BY is_missing, lower(ifnull(artist, '')), lower(title) LIMIT 2000"
    );
    let mut stmt = conn.prepare(&sql)?;
    let rows = stmt.query_map([search::pattern(search_text)], map)?;
    Ok(rows.collect::<rusqlite::Result<Vec<_>>>()?)
}
