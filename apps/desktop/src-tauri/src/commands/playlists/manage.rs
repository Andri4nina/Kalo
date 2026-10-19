use kalo_core::Playlist;
use tauri::State;

use kalo_database::playlists;

use crate::state::AppState;
use crate::CommandError;

#[tauri::command]
pub fn playlist_list(state: State<'_, AppState>) -> Result<Vec<Playlist>, CommandError> {
    Ok(state.db.with(|conn| playlists::list_playlists(conn))?)
}

#[tauri::command]
pub fn playlist_create(state: State<'_, AppState>, name: String) -> Result<Playlist, CommandError> {
    Ok(state.db.with(|conn| playlists::create_playlist(conn, &name))?)
}

#[tauri::command]
pub fn playlist_rename(state: State<'_, AppState>, playlist_id: i64, name: String) -> Result<Playlist, CommandError> {
    Ok(state
        .db
        .with(|conn| playlists::rename_playlist(conn, playlist_id, &name))?)
}

#[tauri::command]
pub fn playlist_delete(state: State<'_, AppState>, playlist_id: i64) -> Result<(), CommandError> {
    state.db.with(|conn| playlists::delete_playlist(conn, playlist_id))?;
    Ok(())
}
