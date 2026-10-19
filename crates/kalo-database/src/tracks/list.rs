use kalo_core::{Track, TrackQuery};
use rusqlite::{params, Connection};

use crate::{tracks::select, tracks::sort, DbResult};

const FILTERS: &str = "WHERE (?1 IS NULL OR t.title LIKE ?1 OR a.name LIKE ?1 OR al.title LIKE ?1 OR t.genre LIKE ?1)
    AND (?2 = 0 OR EXISTS(SELECT 1 FROM favorites f WHERE f.track_id = t.id))
    AND (?3 IS NULL OR EXISTS(SELECT 1 FROM playlist_tracks pt WHERE pt.track_id = t.id AND pt.playlist_id = ?3))";

fn pattern(query: &TrackQuery) -> Option<String> {
    query
        .search
        .as_deref()
        .map(str::trim)
        .filter(|value| !value.is_empty())
        .map(|value| format!("%{value}%"))
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
    let rows = stmt.query_map(
        params![
            pattern(query),
            query.favorites_only as i64,
            query.playlist_id,
            query.bounded_limit(),
            query.bounded_offset()
        ],
        select::map,
    )?;
    Ok(rows.collect::<rusqlite::Result<Vec<_>>>()?)
}

pub fn count(conn: &Connection, query: &TrackQuery) -> DbResult<i64> {
    let sql = format!("SELECT COUNT(*) {} {}", select::FROM, FILTERS);
    Ok(conn.query_row(
        &sql,
        params![pattern(query), query.favorites_only as i64, query.playlist_id],
        |row| row.get(0),
    )?)
}
