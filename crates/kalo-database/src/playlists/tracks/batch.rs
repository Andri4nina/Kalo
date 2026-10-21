use rusqlite::{params, Connection};

use crate::DbResult;

use super::mutate::{normalize, touch};

/// Removes several tracks in one transaction, then renumbers the remaining rows.
pub fn remove_tracks(conn: &Connection, playlist_id: i64, track_ids: &[i64]) -> DbResult<()> {
    if track_ids.is_empty() {
        return Ok(());
    }
    let transaction = conn.unchecked_transaction()?;
    for track_id in track_ids {
        transaction.execute(
            "DELETE FROM playlist_tracks WHERE playlist_id = ?1 AND track_id = ?2",
            params![playlist_id, track_id],
        )?;
    }
    normalize(&transaction, playlist_id)?;
    touch(&transaction, playlist_id)?;
    transaction.commit()?;
    Ok(())
}
