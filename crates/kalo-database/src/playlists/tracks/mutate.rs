use rusqlite::{params, Connection};

use crate::DbResult;

pub fn add_track(conn: &Connection, playlist_id: i64, track_id: i64) -> DbResult<()> {
    let position: i64 = conn.query_row(
        "SELECT COALESCE(MAX(position) + 1, 0) FROM playlist_tracks WHERE playlist_id = ?1",
        [playlist_id],
        |row| row.get(0),
    )?;
    conn.execute(
        "INSERT INTO playlist_tracks (playlist_id, track_id, position) VALUES (?1, ?2, ?3)
         ON CONFLICT(playlist_id, track_id) DO NOTHING",
        params![playlist_id, track_id, position],
    )?;
    touch(conn, playlist_id)
}

pub fn remove_track(conn: &Connection, playlist_id: i64, track_id: i64) -> DbResult<()> {
    conn.execute(
        "DELETE FROM playlist_tracks WHERE playlist_id = ?1 AND track_id = ?2",
        params![playlist_id, track_id],
    )?;
    conn.execute(
        "WITH ordered AS (
            SELECT track_id, ROW_NUMBER() OVER (ORDER BY position) - 1 AS new_position
            FROM playlist_tracks WHERE playlist_id = ?1
         )
         UPDATE playlist_tracks SET position =
            (SELECT new_position FROM ordered WHERE ordered.track_id = playlist_tracks.track_id)
         WHERE playlist_id = ?1",
        [playlist_id],
    )?;
    touch(conn, playlist_id)
}

fn touch(conn: &Connection, playlist_id: i64) -> DbResult<()> {
    conn.execute(
        "UPDATE playlists SET updated_at = unixepoch() WHERE id = ?1",
        [playlist_id],
    )?;
    Ok(())
}
