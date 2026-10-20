use kalo_core::{AlbumSummary, ArtistSummary, TrackPage};
use tauri::State;

use kalo_database::{albums, artists};

use crate::state::AppState;
use crate::CommandError;

#[tauri::command]
pub fn artist_get(state: State<'_, AppState>, artist_id: i64) -> Result<Option<ArtistSummary>, CommandError> {
    Ok(state.db.with(|conn| artists::get(conn, artist_id))?)
}

#[tauri::command]
pub fn album_get(state: State<'_, AppState>, album_id: i64) -> Result<Option<AlbumSummary>, CommandError> {
    Ok(state.db.with(|conn| albums::get(conn, album_id))?)
}

#[tauri::command]
pub fn artist_tracks(
    state: State<'_, AppState>,
    artist_id: i64,
    limit: i64,
    offset: i64,
) -> Result<TrackPage, CommandError> {
    Ok(state.db.with(|conn| artists::page(conn, artist_id, limit, offset))?)
}

#[tauri::command]
pub fn album_tracks(
    state: State<'_, AppState>,
    album_id: i64,
    limit: i64,
    offset: i64,
) -> Result<TrackPage, CommandError> {
    Ok(state.db.with(|conn| albums::page(conn, album_id, limit, offset))?)
}
