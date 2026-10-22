use kalo_core::Playlist;
use kalo_database::playlists;
use tauri::State;

use crate::commands::cover_image::import_cover;
use crate::state::AppState;
use crate::CommandError;

#[tauri::command]
pub fn playlist_update_details(
    state: State<'_, AppState>,
    playlist_id: i64,
    description: String,
) -> Result<Playlist, CommandError> {
    Ok(state
        .db
        .with(|conn| playlists::update_details(conn, playlist_id, &description))?)
}

/// Sets (image copied into the cache) or clears the playlist cover.
#[tauri::command]
pub fn playlist_set_cover(
    state: State<'_, AppState>,
    playlist_id: i64,
    source: Option<String>,
) -> Result<Playlist, CommandError> {
    state.db.with(|conn| playlists::get_playlist(conn, playlist_id))?;
    let stored = match source {
        Some(source) => Some(import_cover(&state.cache_dir, &source)?),
        None => None,
    };
    Ok(state
        .db
        .with(|conn| playlists::set_cover(conn, playlist_id, stored.as_deref()))?)
}
