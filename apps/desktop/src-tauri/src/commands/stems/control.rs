use kalo_stems::models;
use tauri::State;

use super::state::{model_dir, stem_error, StemState};
use crate::state::AppState;
use crate::CommandError;

#[tauri::command]
pub fn stem_model_uninstall(state: State<'_, AppState>, stems: State<'_, StemState>) -> Result<(), CommandError> {
    let _lease = stems.slot.try_acquire().ok_or(CommandError::Busy)?;
    models::uninstall(&model_dir(&state)).map_err(stem_error)
}

#[tauri::command]
pub fn stem_cancel(stems: State<'_, StemState>) {
    stems.cancel();
}
