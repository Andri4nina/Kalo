use kalo_core::DownloadEntry;
use kalo_database::downloads;
use tauri::{AppHandle, State};

use super::start::launch;
use super::state::DownloadState;
use crate::state::AppState;
use crate::CommandError;

#[tauri::command]
pub fn download_list(state: State<'_, AppState>) -> Result<Vec<DownloadEntry>, CommandError> {
    Ok(state.db.with(|conn| downloads::list(conn))?)
}

#[tauri::command]
pub fn download_pause(active: State<'_, DownloadState>, id: i64) -> bool {
    active.signal(id, false)
}

/// Resumes a paused or failed download from its partial file.
#[tauri::command]
pub fn download_resume(
    app: AppHandle,
    state: State<'_, AppState>,
    active: State<'_, DownloadState>,
    id: i64,
) -> Result<(), CommandError> {
    let entry = state.db.with(|conn| downloads::get(conn, id))?;
    if !matches!(entry.status.as_str(), "paused" | "failed") {
        return Err(CommandError::Invalid(
            "Ce téléchargement ne peut pas être repris.".into(),
        ));
    }
    launch(app, &active, id)
}
