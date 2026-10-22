use rusqlite::Connection;

use crate::DbResult;

const MIGRATIONS: &[(i64, &str)] = &[
    (1, include_str!("../migrations/001_roots.sql")),
    (2, include_str!("../migrations/002_catalog.sql")),
    (3, include_str!("../migrations/003_playlists.sql")),
    (4, include_str!("../migrations/004_listening.sql")),
    (5, include_str!("../migrations/005_indexes.sql")),
    (6, include_str!("../migrations/006_playlist_details.sql")),
    (7, include_str!("../migrations/007_content_hash.sql")),
    (8, include_str!("../migrations/008_non_music.sql")),
    (9, include_str!("../migrations/009_lyrics.sql")),
    (10, include_str!("../migrations/010_videos.sql")),
    (11, include_str!("../migrations/011_stem_jobs.sql")),
    (12, include_str!("../migrations/012_downloads.sql")),
];

pub fn run(conn: &mut Connection) -> DbResult<()> {
    let current: i64 = conn.pragma_query_value(None, "user_version", |row| row.get(0))?;
    for (version, sql) in MIGRATIONS {
        if *version <= current {
            continue;
        }
        let tx = conn.transaction()?;
        tx.execute_batch(sql)?;
        tx.pragma_update(None, "user_version", version)?;
        tx.commit()?;
    }
    Ok(())
}

/// Schema version produced by this build.
pub fn latest_version() -> i64 {
    MIGRATIONS.last().map(|(version, _)| *version).unwrap_or(0)
}
