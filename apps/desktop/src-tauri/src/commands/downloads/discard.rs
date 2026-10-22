use kalo_database::downloads;
use tauri::State;

use super::state::DownloadState;
use super::workdir::work_dir;
use crate::state::AppState;
use crate::CommandError;

/// Cancels a running transfer, or discards a paused one (Kalo's partial file only).
#[tauri::command]
pub fn download_cancel(
    state: State<'_, AppState>,
    active: State<'_, DownloadState>,
    id: i64,
) -> Result<(), CommandError> {
    if active.signal(id, true) {
        return Ok(());
    }
    let _ = std::fs::remove_dir_all(work_dir(&state, id));
    Ok(state
        .db
        .with(|conn| downloads::set_status(conn, id, "cancelled", None))?)
}

/// Removes a finished entry from the list; the library copy stays.
#[tauri::command]
pub fn download_remove(
    state: State<'_, AppState>,
    active: State<'_, DownloadState>,
    id: i64,
) -> Result<(), CommandError> {
    if active.signal(id, true) {
        return Err(CommandError::Invalid(
            "Annulez d'abord le téléchargement en cours.".into(),
        ));
    }
    let _ = std::fs::remove_dir_all(work_dir(&state, id));
    state.db.with(|conn| downloads::delete(conn, id))?;
    Ok(())
}
