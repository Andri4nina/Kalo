use kalo_core::Video;
use kalo_database::videos;
use tauri::State;

use crate::state::AppState;
use crate::CommandError;

/// Local video clips found during the analyses, optionally filtered.
#[tauri::command]
pub fn video_list(state: State<'_, AppState>, search: Option<String>) -> Result<Vec<Video>, CommandError> {
    Ok(state.db.with(|conn| videos::list(conn, search.as_deref()))?)
}
