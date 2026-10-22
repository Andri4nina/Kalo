use std::path::Path;

use kalo_core::{LyricsOrigin, LyricsSource};
use kalo_database::{lyrics, tracks};
use tauri::State;

use crate::state::AppState;
use crate::CommandError;

use super::files::{read_text, sibling};

/// Lyrics edited in Kalo first, then a `.lrc`, then a `.txt` next to the audio.
#[tauri::command]
pub fn track_lyrics(state: State<'_, AppState>, track_id: i64) -> Result<Option<LyricsSource>, CommandError> {
    if let Some(content) = state.db.with(|conn| lyrics::get(conn, track_id))? {
        return Ok(Some(LyricsSource {
            content,
            origin: LyricsOrigin::Edited,
        }));
    }
    let Some(path) = state.db.with(|conn| tracks::find_path(conn, track_id))? else {
        return Ok(None);
    };
    for (extension, origin) in [("lrc", LyricsOrigin::LrcFile), ("txt", LyricsOrigin::TextFile)] {
        if let Some(file) = sibling(Path::new(&path), extension) {
            return Ok(Some(LyricsSource {
                content: read_text(&file)?,
                origin,
            }));
        }
    }
    Ok(None)
}
