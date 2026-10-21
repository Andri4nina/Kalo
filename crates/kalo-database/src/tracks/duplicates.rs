use std::collections::BTreeMap;

use kalo_core::{DuplicateGroup, Track};
use rusqlite::Connection;

use crate::{tracks::select, DbResult};

pub fn duplicates(conn: &Connection) -> DbResult<Vec<DuplicateGroup>> {
    let sql = format!(
        "SELECT {} {} WHERE t.is_missing = 0 AND (lower(trim(t.title)), lower(trim(ifnull(a.name, ''))), t.duration_ms / 1000) IN (
            SELECT lower(trim(t.title)), lower(trim(ifnull(a.name, ''))), t.duration_ms / 1000
            FROM tracks t LEFT JOIN artists a ON a.id = t.artist_id
            GROUP BY 1, 2, 3 HAVING COUNT(*) > 1
         )
         ORDER BY lower(trim(t.title)), lower(trim(ifnull(a.name, ''))), t.path",
        select::COLUMNS,
        select::FROM
    );
    let mut stmt = conn.prepare(&sql)?;
    let rows = stmt.query_map([], select::map)?;
    let mut groups: BTreeMap<String, DuplicateGroup> = BTreeMap::new();
    for track in rows.collect::<rusqlite::Result<Vec<Track>>>()? {
        let key = group_key(&track);
        groups
            .entry(key.clone())
            .or_insert_with(|| DuplicateGroup { key, title: track.title.clone(), artist: track.artist.clone(), tracks: Vec::new() })
            .tracks
            .push(track);
    }
    Ok(groups.into_values().collect())
}

fn group_key(track: &Track) -> String {
    format!(
        "{}|{}|{}",
        track.title.trim().to_lowercase(),
        track.artist.as_deref().unwrap_or("").trim().to_lowercase(),
        track.duration_ms / 1000
    )
}