use std::fs;
use std::path::{Path, PathBuf};

use kalo_database::tracks;
use tauri::State;

use crate::state::AppState;
use crate::CommandError;

const MAX_LYRICS_BYTES: u64 = 1_000_000;

#[tauri::command]
pub fn track_lyrics(state: State<'_, AppState>, track_id: i64) -> Result<Option<String>, CommandError> {
    let Some(path) = state.db.with(|conn| tracks::find_path(conn, track_id))? else {
        return Ok(None);
    };
    let Some(file) = lyrics_path(Path::new(&path)) else {
        return Ok(None);
    };
    let size = fs::metadata(&file).map_err(read_error)?.len();
    if size > MAX_LYRICS_BYTES {
        return Err(CommandError::Invalid(
            "Fichier de paroles trop volumineux (1 Mo maximum).".into(),
        ));
    }
    let text = fs::read_to_string(&file).map_err(read_error)?;
    Ok(Some(text))
}

fn lyrics_path(audio: &Path) -> Option<PathBuf> {
    let lower = audio.with_extension("lrc");
    if lower.is_file() {
        return Some(lower);
    }
    let upper = audio.with_extension("LRC");
    if upper.is_file() {
        return Some(upper);
    }
    None
}

fn read_error(error: std::io::Error) -> CommandError {
    CommandError::Invalid(format!("Paroles illisibles : {error}"))
}
