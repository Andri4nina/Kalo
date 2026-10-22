use kalo_core::{DuplicateGroup, Track};
use rusqlite::Connection;

use crate::{tracks::select, DbResult};

const FRESH: &str = "is_missing = 0 AND content_hash IS NOT NULL AND hashed_mtime IS mtime";

/// Groups of present files whose content hash is identical and still valid.
pub fn content_duplicates(conn: &Connection) -> DbResult<Vec<DuplicateGroup>> {
    let mut hashes = conn.prepare(&format!(
        "SELECT content_hash FROM tracks WHERE {FRESH}
         GROUP BY content_hash HAVING COUNT(*) > 1 ORDER BY content_hash"
    ))?;
    let hashes = hashes
        .query_map([], |row| row.get::<_, String>(0))?
        .collect::<rusqlite::Result<Vec<_>>>()?;
    let sql = format!(
        "SELECT {} {} WHERE t.content_hash = ?1 AND t.is_missing = 0 AND t.hashed_mtime IS t.mtime ORDER BY t.path",
        select::COLUMNS,
        select::FROM
    );
    let mut stmt = conn.prepare(&sql)?;
    let mut groups = Vec::with_capacity(hashes.len());
    for hash in hashes {
        let tracks = stmt
            .query_map([&hash], select::map)?
            .collect::<rusqlite::Result<Vec<Track>>>()?;
        let Some(first) = tracks.first() else { continue };
        groups.push(DuplicateGroup {
            key: hash.clone(),
            title: first.title.clone(),
            artist: first.artist.clone(),
            tracks,
        });
    }
    Ok(groups)
}
