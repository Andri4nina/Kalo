use kalo_core::{DuplicateGroup, FingerprintSummary};
use kalo_database::tracks;
use tauri::{AppHandle, Emitter, State};

use crate::state::AppState;
use crate::CommandError;

/// Hashes same-size files (read-only) to find identical content.
/// Shares the scan slot: never runs during an analysis or an import.
#[tauri::command]
pub async fn library_fingerprint(
    app: AppHandle,
    state: State<'_, AppState>,
) -> Result<FingerprintSummary, CommandError> {
    let (db, slot) = (state.db.clone(), state.scanning.clone());
    let lease = slot.try_acquire().ok_or(CommandError::Busy)?;
    tauri::async_runtime::spawn_blocking(move || {
        let _lease = lease;
        kalo_library::fingerprint(&db, |progress| {
            let _ = app.emit("library:fingerprint-progress", progress);
        })
        .map_err(CommandError::from)
    })
    .await
    .map_err(|error| CommandError::Invalid(format!("Analyse interrompue : {error}")))?
}

#[tauri::command]
pub fn library_content_duplicates(state: State<'_, AppState>) -> Result<Vec<DuplicateGroup>, CommandError> {
    Ok(state.db.with(|conn| tracks::content_duplicates(conn))?)
}
