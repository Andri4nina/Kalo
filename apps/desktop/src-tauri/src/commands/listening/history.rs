use kalo_core::TrackPage;
use tauri::State;

use kalo_database::tracks;

use crate::state::AppState;
use crate::CommandError;

#[tauri::command]
pub fn history_recent(state: State<'_, AppState>, limit: i64) -> Result<TrackPage, CommandError> {
    let items = state.db.with(|conn| tracks::recent(conn, limit))?;
    Ok(TrackPage {
        total: items.len() as i64,
        items,
    })
}

#[tauri::command]
pub fn history_record(state: State<'_, AppState>, track_id: i64) -> Result<(), CommandError> {
    state.db.with(|conn| tracks::record_play(conn, track_id))?;
    Ok(())
}
