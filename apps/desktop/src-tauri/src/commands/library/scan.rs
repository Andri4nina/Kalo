use kalo_core::ScanSummary;
use tauri::{AppHandle, Emitter, State};

use crate::state::AppState;
use crate::CommandError;

#[tauri::command]
pub async fn library_scan(
    app: AppHandle,
    state: State<'_, AppState>,
    root_id: i64,
) -> Result<ScanSummary, CommandError> {
    let (db, cache_dir, slot) = {
        let inner = state.inner();
        (inner.db.clone(), inner.cache_dir.clone(), inner.scanning.clone())
    };
    let lease = slot.try_acquire().ok_or(CommandError::Busy)?;
    tauri::async_runtime::spawn_blocking(move || {
        let _lease = lease;
        kalo_library::scan_root(&db, root_id, &cache_dir, |progress| {
            let _ = app.emit("library:scan-progress", progress);
        })
        .map_err(CommandError::from)
    })
    .await
    .map_err(|error| CommandError::Invalid(format!("Analyse interrompue : {error}")))?
}
