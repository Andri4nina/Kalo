use kalo_core::FileImportReport;
use tauri::State;

use crate::state::AppState;
use crate::CommandError;

const MAX_FILES: usize = 500;

/// Copies files chosen by the user into a library root, verifies each copy and
/// indexes it. Sources are only read: they are never moved or deleted.
#[tauri::command]
pub async fn library_import_files(
    state: State<'_, AppState>,
    root_id: i64,
    sources: Vec<String>,
) -> Result<FileImportReport, CommandError> {
    if sources.is_empty() || sources.len() > MAX_FILES {
        return Err(CommandError::Invalid(format!(
            "Choisissez entre 1 et {MAX_FILES} fichiers."
        )));
    }
    let (db, cache_dir, slot) = (state.db.clone(), state.cache_dir.clone(), state.scanning.clone());
    let lease = slot.try_acquire().ok_or(CommandError::Busy)?;
    tauri::async_runtime::spawn_blocking(move || {
        let _lease = lease;
        kalo_library::import_files(&db, root_id, &cache_dir, &sources).map_err(CommandError::from)
    })
    .await
    .map_err(|error| CommandError::Invalid(format!("Import interrompu : {error}")))?
}
