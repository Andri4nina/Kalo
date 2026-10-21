use kalo_core::DuplicateGroup;
use tauri::State;

use kalo_database::tracks;

use crate::state::AppState;
use crate::CommandError;

#[tauri::command]
pub fn library_duplicates(state: State<'_, AppState>) -> Result<Vec<DuplicateGroup>, CommandError> {
    Ok(state.db.with(|conn| tracks::duplicates(conn))?)
}
