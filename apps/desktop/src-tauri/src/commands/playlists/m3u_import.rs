use std::fs;
use std::path::{Path, PathBuf};

use kalo_core::ImportSummary;
use kalo_database::{playlists, tracks};
use tauri::State;

use crate::state::AppState;
use crate::CommandError;

const MAX_BYTES: u64 = 2_000_000;

#[tauri::command]
pub fn playlist_import_m3u(state: State<'_, AppState>, playlist_id: i64, source: String) -> Result<ImportSummary, CommandError> {
    let path = Path::new(&source);
    let metadata = fs::metadata(path).map_err(|_| CommandError::Invalid("Fichier M3U introuvable.".into()))?;
    if !metadata.is_file() || metadata.len() > MAX_BYTES {
        return Err(CommandError::Invalid("Fichier M3U invalide ou trop volumineux.".into()));
    }
    let content = fs::read_to_string(path).map_err(|_| CommandError::Invalid("Le fichier M3U doit être en UTF-8.".into()))?;
    if !content.lines().any(|line| line.trim_start().starts_with("#EXTM3U")) {
        return Err(CommandError::Invalid("Ce fichier n'est pas une playlist M3U.".into()));
    }
    state.db.with(|conn| playlists::get_playlist(conn, playlist_id))?;
    let base = path.parent().unwrap_or(Path::new("."));
    let mut summary = ImportSummary::default();
    for line in content.lines().map(str::trim).filter(|line| !line.is_empty() && !line.starts_with('#')) {
        let candidate = if Path::new(line).is_absolute() { PathBuf::from(line) } else { base.join(line) };
        let Ok(canonical) = dunce::canonicalize(&candidate) else {
            summary.skipped += 1;
            continue;
        };
        let display = dunce::simplified(&canonical).to_string_lossy().into_owned();
        let id = state.db.with(|conn| tracks::find_id_by_path(conn, &display))?;
        match id {
            Some(track_id) => {
                state.db.with(|conn| playlists::add_track(conn, playlist_id, track_id))?;
                summary.added += 1;
            }
            None => summary.skipped += 1,
        }
    }
    Ok(summary)
}