use kalo_core::{Track, TrackQuery};
use rusqlite::Connection;

use crate::{search, tracks::select, tracks::sort, DbResult};

const FILTERS: &str = "WHERE (?1 IS NULL OR t.title LIKE ?1 ESCAPE '\\' OR a.name LIKE ?1 ESCAPE '\\' OR al.title LIKE ?1 ESCAPE '\\' OR t.genre LIKE ?1 ESCAPE '\\' OR t.path LIKE ?1 ESCAPE '\\')
    AND (?2 = 0 OR EXISTS(SELECT 1 FROM favorites f WHERE f.track_id = t.id))
    AND (?3 IS NULL OR EXISTS(SELECT 1 FROM playlist_tracks pt WHERE pt.track_id = t.id AND pt.playlist_id = ?3))
    AND (?6 IS NULL OR t.format = ?6 COLLATE NOCASE)
    AND (?7 IS NULL OR (?7 = 'missing' AND t.is_missing = 1) OR (?7 = 'available' AND t.is_missing = 0))
    AND (?8 IS NULL OR t.duration_ms >= ?8)
    AND (?9 IS NULL OR t.duration_ms <= ?9)";

fn bind(query: &TrackQuery) -> impl rusqlite::Params {
    (
        search::pattern(query.search.as_deref()),
        query.favorites_only as i64,
        query.playlist_id,
        query.bounded_limit(),
        query.bounded_offset(),
        query.format.clone(),
        query.availability.clone(),
        query.min_duration_ms,
        query.max_duration_ms,
    )
}

pub fn list(conn: &Connection, query: &TrackQuery) -> DbResult<Vec<Track>> {
    let sql = format!(
        "SELECT {} {} {} {} LIMIT ?4 OFFSET ?5",
        select::COLUMNS,
        select::FROM,
        FILTERS,
        sort::clause(&query.sort)
    );
    let mut stmt = conn.prepare(&sql)?;
    let rows = stmt.query_map(bind(query), select::map)?;
    Ok(rows.collect::<rusqlite::Result<Vec<_>>>()?)
}

pub fn count(conn: &Connection, query: &TrackQuery) -> DbResult<i64> {
    let sql = format!("SELECT COUNT(*) {} {}", select::FROM, FILTERS);
    Ok(conn.query_row(&sql, bind(query), |row| row.get(0))?)
}
