use kalo_database::lyrics;
use tauri::State;

use crate::state::AppState;
use crate::CommandError;

/// Stores lyrics edited or synchronised in Kalo; files next to the audio stay untouched.
#[tauri::command]
pub fn lyrics_save(state: State<'_, AppState>, track_id: i64, content: String) -> Result<(), CommandError> {
    Ok(state.db.with(|conn| lyrics::save(conn, track_id, &content))?)
}

/// Removes the edited version so the `.lrc` or `.txt` file applies again.
#[tauri::command]
pub fn lyrics_reset(state: State<'_, AppState>, track_id: i64) -> Result<bool, CommandError> {
    Ok(state.db.with(|conn| lyrics::reset(conn, track_id))?)
}
