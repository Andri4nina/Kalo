use kalo_core::PlaylistDetail;
use tauri::State;

use kalo_database::playlists;

use crate::state::AppState;
use crate::CommandError;

#[tauri::command]
pub fn playlist_detail(state: State<'_, AppState>, playlist_id: i64) -> Result<PlaylistDetail, CommandError> {
    let detail = state.db.with(|conn| {
        let playlist = playlists::get_playlist(conn, playlist_id)?;
        let tracks = playlists::list_tracks(conn, playlist_id)?;
        Ok(PlaylistDetail { playlist, tracks })
    })?;
    Ok(detail)
}
