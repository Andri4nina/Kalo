use std::path::Path;

use kalo_database::{roots, tracks};
use tauri::{AppHandle, Manager, State};

use crate::state::AppState;
use crate::CommandError;

#[tauri::command]
pub fn library_relocate_track(
    app: AppHandle,
    state: State<'_, AppState>,
    track_id: i64,
    new_path: String,
) -> Result<(), CommandError> {
    let canonical = dunce::canonicalize(Path::new(&new_path))
        .map_err(|_| CommandError::Invalid(format!("Fichier introuvable : {new_path}")))?;
    if !canonical.is_file() {
        return Err(CommandError::Invalid("Ce chemin n'est pas un fichier.".into()));
    }
    if !kalo_library::is_supported(&canonical) {
        return Err(CommandError::Invalid("Format audio non pris en charge.".into()));
    }
    let display = dunce::simplified(&canonical).to_string_lossy().into_owned();
    let roots = state.db.with(|conn| roots::list(conn))?;
    let root = roots
        .iter()
        .find(|candidate| canonical.starts_with(&candidate.path))
        .ok_or_else(|| CommandError::Invalid("Le fichier doit se trouver dans un dossier de la bibliothèque.".into()))?;
    let changed = state.db.with(|conn| tracks::relocate(conn, track_id, &display, root.id))?;
    if !changed {
        return Err(CommandError::NotFound);
    }
    app.asset_protocol_scope()
        .allow_file(&canonical)
        .map_err(|error| CommandError::Invalid(format!("Accès au fichier impossible : {error}")))?;
    Ok(())
}