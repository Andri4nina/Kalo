use tauri::State;

use kalo_database::playlists;

use crate::state::AppState;
use crate::CommandError;

#[tauri::command]
pub fn playlist_add_track(state: State<'_, AppState>, playlist_id: i64, track_id: i64) -> Result<(), CommandError> {
    state
        .db
        .with(|conn| playlists::add_track(conn, playlist_id, track_id))?;
    Ok(())
}

#[tauri::command]
pub fn playlist_remove_track(state: State<'_, AppState>, playlist_id: i64, track_id: i64) -> Result<(), CommandError> {
    state
        .db
        .with(|conn| playlists::remove_track(conn, playlist_id, track_id))?;
    Ok(())
}

#[tauri::command]
pub fn playlist_reorder(state: State<'_, AppState>, playlist_id: i64, track_ids: Vec<i64>) -> Result<(), CommandError> {
    state
        .db
        .with(|conn| playlists::reorder_playlist(conn, playlist_id, &track_ids))?;
    Ok(())
}
