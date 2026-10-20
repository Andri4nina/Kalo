use kalo_core::{AlbumSummary, ArtistSummary};
use tauri::State;

use kalo_database::{albums, artists};

use crate::state::AppState;
use crate::CommandError;

#[tauri::command]
pub fn library_artists(state: State<'_, AppState>) -> Result<Vec<ArtistSummary>, CommandError> {
    Ok(state.db.with(|conn| artists::list(conn))?)
}

#[tauri::command]
pub fn library_albums(state: State<'_, AppState>) -> Result<Vec<AlbumSummary>, CommandError> {
    Ok(state.db.with(|conn| albums::list(conn))?)
}
