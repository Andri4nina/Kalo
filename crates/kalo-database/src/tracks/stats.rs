use kalo_core::LibraryStats;
use rusqlite::Connection;

use crate::DbResult;

pub fn stats(conn: &Connection) -> DbResult<LibraryStats> {
    Ok(conn.query_row(
        "SELECT
            (SELECT COUNT(*) FROM tracks WHERE is_missing = 0),
            (SELECT COUNT(*) FROM albums),
            (SELECT COUNT(*) FROM artists),
            (SELECT COUNT(*) FROM favorites),
            (SELECT COUNT(*) FROM playlists),
            (SELECT COALESCE(SUM(duration_ms), 0) FROM tracks WHERE is_missing = 0),
            (SELECT COUNT(*) FROM tracks WHERE is_missing = 1)",
        [],
        |row| {
            Ok(LibraryStats {
                tracks: row.get(0)?,
                albums: row.get(1)?,
                artists: row.get(2)?,
                favorites: row.get(3)?,
                playlists: row.get(4)?,
                total_duration_ms: row.get(5)?,
                missing: row.get(6)?,
            })
        },
    )?)
}
