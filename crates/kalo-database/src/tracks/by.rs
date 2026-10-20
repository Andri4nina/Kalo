use kalo_core::Track;
use rusqlite::{params, Connection};

use crate::{tracks::select, DbResult};

/// Paginates the tracks matching a constant filter bound to `?1`. The filter is
/// never built from user input, only from the clauses below.
pub fn page(conn: &Connection, filter: &str, id: i64, limit: i64, offset: i64) -> DbResult<(Vec<Track>, i64)> {
    let total = conn.query_row(
        &format!("SELECT COUNT(*) {} WHERE {}", select::FROM, filter),
        params![id],
        |row| row.get(0),
    )?;
    let sql = format!(
        "SELECT {} {} WHERE {} \
         ORDER BY al.title COLLATE NOCASE, t.disc_no, t.track_no, t.title COLLATE NOCASE \
         LIMIT ?2 OFFSET ?3",
        select::COLUMNS,
        select::FROM,
        filter
    );
    let mut stmt = conn.prepare(&sql)?;
    let rows = stmt.query_map(params![id, limit.clamp(1, 500), offset.max(0)], select::map)?;
    Ok((rows.collect::<rusqlite::Result<Vec<_>>>()?, total))
}
