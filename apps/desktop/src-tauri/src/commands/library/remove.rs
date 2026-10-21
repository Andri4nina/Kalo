use kalo_database::tracks;
use tauri::State;

use crate::state::AppState;
use crate::CommandError;

#[tauri::command]
pub fn library_remove_track(state: State<'_, AppState>, track_id: i64) -> Result<(), CommandError> {
    let changed = state.db.with(|conn| tracks::remove(conn, track_id))?;
    if !changed {
        return Err(CommandError::NotFound);
    }
    Ok(())
}
