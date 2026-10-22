use kalo_core::{StemModelStatus, StemProgress};
use kalo_stems::models;
use tauri::{AppHandle, Emitter, State};

use super::state::{model_dir, stem_error, StemState};
use crate::state::AppState;
use crate::CommandError;

#[tauri::command]
pub fn stem_model_status(state: State<'_, AppState>) -> StemModelStatus {
    let dir = model_dir(&state);
    StemModelStatus {
        installed: models::is_installed(&dir),
        installed_bytes: models::installed_size(&dir),
        download_bytes: models::download_size(),
        source: format!("huggingface.co/{} ({})", models::REPOSITORY, &models::REVISION[..10]),
        license: models::LICENSE.to_owned(),
    }
}

/// Downloads the networks after the user's explicit request; every file is
/// checked against its pinned SHA-256 before use.
#[tauri::command]
pub async fn stem_model_install(
    app: AppHandle,
    state: State<'_, AppState>,
    stems: State<'_, StemState>,
) -> Result<(), CommandError> {
    let lease = stems.slot.try_acquire().ok_or(CommandError::Busy)?;
    let (dir, cancel) = (model_dir(&state), stems.arm());
    tauri::async_runtime::spawn_blocking(move || {
        let _lease = lease;
        models::install(&dir, &cancel, &|done, total| {
            let _ = app.emit(
                "stem:model-progress",
                StemProgress {
                    job_id: None,
                    done,
                    total,
                },
            );
        })
        .map_err(stem_error)
    })
    .await
    .map_err(|error| CommandError::Invalid(format!("Téléchargement interrompu : {error}")))?
}
