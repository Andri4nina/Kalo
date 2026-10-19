use std::path::Path;

use kalo_core::LibraryRoot;
use tauri::{AppHandle, Manager, State};

use kalo_database::roots;

use crate::state::AppState;
use crate::CommandError;

#[tauri::command]
pub fn library_roots(state: State<'_, AppState>) -> Result<Vec<LibraryRoot>, CommandError> {
    Ok(state.db.with(|conn| roots::list(conn))?)
}

#[tauri::command]
pub fn library_add_root(app: AppHandle, state: State<'_, AppState>, path: String) -> Result<LibraryRoot, CommandError> {
    let canonical = dunce::canonicalize(Path::new(&path))
        .map_err(|_| CommandError::Invalid(format!("Dossier introuvable : {path}")))?;
    if !canonical.is_dir() {
        return Err(CommandError::Invalid(format!(
            "Ce chemin n'est pas un dossier : {path}"
        )));
    }
    let display = dunce::simplified(&canonical).to_string_lossy().into_owned();
    let root = state.db.with(|conn| roots::add(conn, &display))?;
    app.asset_protocol_scope()
        .allow_directory(&canonical, true)
        .map_err(|error| CommandError::Invalid(format!("Accès au dossier impossible : {error}")))?;
    Ok(root)
}

#[tauri::command]
pub fn library_remove_root(state: State<'_, AppState>, root_id: i64) -> Result<(), CommandError> {
    if state.scanning.is_active() {
        return Err(CommandError::Busy);
    }
    state.db.with(|conn| roots::remove(conn, root_id))?;
    Ok(())
}
