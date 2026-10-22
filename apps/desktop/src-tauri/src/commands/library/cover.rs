use kalo_database::tracks;
use tauri::State;

use crate::commands::cover_image::import_cover;
use crate::state::AppState;
use crate::CommandError;

#[tauri::command]
pub fn library_set_cover(state: State<'_, AppState>, track_id: i64, source: String) -> Result<String, CommandError> {
    state
        .db
        .with(|conn| tracks::find_path(conn, track_id))?
        .ok_or(CommandError::NotFound)?;
    let stored = import_cover(&state.cache_dir, &source)?;
    let changed = state.db.with(|conn| tracks::set_cover(conn, track_id, &stored))?;
    if !changed {
        return Err(CommandError::NotFound);
    }
    Ok(stored)
}
