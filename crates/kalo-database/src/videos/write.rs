use kalo_core::NewVideo;
use rusqlite::{params, Connection};

use crate::DbResult;

pub fn upsert(conn: &Connection, video: &NewVideo) -> DbResult<()> {
    conn.execute(
        "INSERT INTO videos (path, root_id, title, artist, duration_ms, format, scan_mark)
         VALUES (?1, ?2, ?3, ?4, ?5, ?6, ?7)
         ON CONFLICT(path) DO UPDATE SET title = excluded.title, artist = excluded.artist,
           duration_ms = excluded.duration_ms, format = excluded.format,
           scan_mark = excluded.scan_mark, is_missing = 0",
        params![
            video.path,
            video.root_id,
            video.title,
            video.artist,
            video.duration_ms,
            video.format,
            video.scan_mark
        ],
    )?;
    Ok(())
}

/// Videos of a root not seen during this scan are flagged missing, never deleted.
pub fn finish_scan(conn: &Connection, root_id: i64, mark: i64) -> DbResult<i64> {
    let changed = conn.execute(
        "UPDATE videos SET is_missing = 1 WHERE root_id = ?1 AND scan_mark <> ?2 AND is_missing = 0",
        params![root_id, mark],
    )?;
    Ok(changed as i64)
}
