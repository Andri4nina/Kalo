use std::path::PathBuf;

use kalo_database::{stems, tracks};
use kalo_stems::models;
use tauri::{AppHandle, State};

use super::state::{model_dir, stems_root, StemState};
use crate::state::AppState;
use crate::CommandError;

/// Starts separating a track in the background and returns the job id at
/// once. Progress arrives as `stem:progress`, the end as `stem:finished`.
#[tauri::command]
pub fn stem_start(
    app: AppHandle,
    state: State<'_, AppState>,
    stem_state: State<'_, StemState>,
    track_id: i64,
) -> Result<i64, CommandError> {
    let lease = stem_state.slot.try_acquire().ok_or(CommandError::Busy)?;
    let model = model_dir(&state);
    if !models::is_installed(&model) {
        return Err(CommandError::Invalid(
            "Téléchargez d'abord le modèle de séparation.".into(),
        ));
    }
    let source = state
        .db
        .with(|conn| tracks::find_path(conn, track_id))?
        .ok_or(CommandError::NotFound)?;
    let job = state.db.with(|conn| stems::create(conn, track_id))?;
    let out = stems_root(&state).join(job.to_string());
    let cancel = stem_state.arm();
    tauri::async_runtime::spawn_blocking(move || {
        let _lease = lease;
        super::run::run(&app, job, &PathBuf::from(source), &model, &out, &cancel);
    });
    Ok(job)
}
