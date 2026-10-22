use std::fs;
use std::path::PathBuf;

use kalo_core::StemJob;
use kalo_database::stems;
use tauri::State;

use super::state::stems_root;
use crate::state::AppState;
use crate::CommandError;

#[tauri::command]
pub fn stem_jobs(state: State<'_, AppState>) -> Result<Vec<StemJob>, CommandError> {
    Ok(state.db.with(|conn| stems::list(conn))?)
}

/// Deletes a job and its generated tracks. Only folders inside Kalo's own
/// `stems` directory are ever removed.
#[tauri::command]
pub fn stem_delete(state: State<'_, AppState>, job_id: i64) -> Result<(), CommandError> {
    let folder = state.db.with(|conn| stems::delete(conn, job_id))?;
    if let Some(folder) = folder.map(PathBuf::from) {
        if folder.starts_with(stems_root(&state)) && folder.is_dir() {
            fs::remove_dir_all(folder)
                .map_err(|error| CommandError::Invalid(format!("Suppression impossible : {error}")))?;
        }
    }
    Ok(())
}
