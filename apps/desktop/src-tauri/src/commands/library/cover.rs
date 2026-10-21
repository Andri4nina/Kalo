use std::fs;
use std::path::Path;

use kalo_database::tracks;
use tauri::State;

use crate::state::AppState;
use crate::CommandError;

const MAX_BYTES: u64 = 12 * 1024 * 1024;

#[tauri::command]
pub fn library_set_cover(state: State<'_, AppState>, track_id: i64, source: String) -> Result<String, CommandError> {
    let path = Path::new(&source);
    let metadata = fs::metadata(path).map_err(|_| CommandError::Invalid("Image introuvable.".into()))?;
    if !metadata.is_file() || metadata.len() > MAX_BYTES {
        return Err(CommandError::Invalid("Image invalide ou trop volumineuse.".into()));
    }
    state
        .db
        .with(|conn| tracks::find_path(conn, track_id))?
        .ok_or(CommandError::NotFound)?;
    let data = fs::read(path).map_err(|_| CommandError::Invalid("Image illisible.".into()))?;
    let stored = kalo_library::store_cover(&state.cache_dir, &data, None)
        .ok_or_else(|| CommandError::Invalid("Format d'image non pris en charge.".into()))?;
    let changed = state.db.with(|conn| tracks::set_cover(conn, track_id, &stored))?;
    if !changed {
        return Err(CommandError::NotFound);
    }
    Ok(stored)
}
