use std::path::{Path, PathBuf};

use kalo_database::{backup, restore};
use tauri::{AppHandle, State};

use crate::setup;
use crate::state::AppState;
use crate::CommandError;

fn same_file(left: &Path, right: &Path) -> bool {
    matches!(
        (std::fs::canonicalize(left), std::fs::canonicalize(right)),
        (Ok(a), Ok(b)) if a == b
    )
}

#[tauri::command]
pub fn data_backup(state: State<'_, AppState>, destination: String) -> Result<(), CommandError> {
    let path = PathBuf::from(destination);
    if same_file(&state.db_path, &path) {
        return Err(CommandError::Invalid(
            "Choisissez un autre fichier que la base active.".to_owned(),
        ));
    }
    state.db.with(|conn| backup::to_file(conn, &path))?;
    Ok(())
}

#[tauri::command]
pub fn data_restore(app: AppHandle, state: State<'_, AppState>, source: String) -> Result<(), CommandError> {
    if state.scanning.is_active() {
        return Err(CommandError::Busy);
    }
    let path = PathBuf::from(source);
    if same_file(&state.db_path, &path) {
        return Err(CommandError::Invalid(
            "La base active ne peut pas être restaurée sur elle-même.".to_owned(),
        ));
    }
    state.db.with(|conn| restore::from_file(conn, &path))?;
    setup::allow_library_roots(&app, &state.db)?;
    Ok(())
}
