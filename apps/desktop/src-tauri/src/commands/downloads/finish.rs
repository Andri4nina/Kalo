use std::path::Path;
use std::time::Duration;

use kalo_core::{FileImportReport, LibraryChanges};
use tauri::{AppHandle, Emitter, Manager};

use crate::state::AppState;

/// Checks a completed transfer, then files it into the library through the
/// verified import (copy, duplicate detection). Returns a failure message.
pub fn finish(app: &AppHandle, part: &Path, file: &Path, md5: Option<&str>, root_id: i64) -> Result<(), String> {
    if let Some(expected) = md5 {
        kalo_downloads::check_md5(part, expected).map_err(|error| error.to_string())?;
    }
    std::fs::rename(part, file).map_err(|error| error.to_string())?;
    if !kalo_library::is_playable_audio(file) {
        return Err("le fichier reçu n'est pas un fichier audio lisible".into());
    }
    let report = import(app, file, root_id)?;
    if let Some(failure) = report.failed.first() {
        return Err(failure.reason.clone());
    }
    let changes = LibraryChanges {
        indexed: 1,
        missing: 0,
        rescanned: false,
    };
    let _ = app.emit("library:changed", changes);
    Ok(())
}

/// Waits (up to a minute) for any analysis or import to finish, then imports.
fn import(app: &AppHandle, file: &Path, root_id: i64) -> Result<FileImportReport, String> {
    let state = app.state::<AppState>();
    for _ in 0..120 {
        if let Some(_lease) = state.scanning.try_acquire() {
            let sources = [file.to_string_lossy().into_owned()];
            return kalo_library::import_files(&state.db, root_id, &state.cache_dir, &sources)
                .map_err(|error| error.to_string());
        }
        std::thread::sleep(Duration::from_millis(500));
    }
    Err("bibliothèque occupée ; relancez le téléchargement".into())
}
