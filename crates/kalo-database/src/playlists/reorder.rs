use rusqlite::{params, Connection};

use crate::DbResult;

pub fn reorder_playlist(conn: &mut Connection, playlist_id: i64, track_ids: &[i64]) -> DbResult<()> {
    let tx = conn.transaction()?;
    {
        let mut stmt =
            tx.prepare("UPDATE playlist_tracks SET position = ?1 WHERE playlist_id = ?2 AND track_id = ?3")?;
        for (position, track_id) in track_ids.iter().enumerate() {
            stmt.execute(params![position as i64, playlist_id, track_id])?;
        }
    }
    tx.execute(
        "UPDATE playlists SET updated_at = unixepoch() WHERE id = ?1",
        [playlist_id],
    )?;
    tx.commit()?;
    Ok(())
}
