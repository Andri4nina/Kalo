use kalo_core::{LibraryStats, TrackPage, TrackQuery};
use tauri::State;

use kalo_database::tracks;

use crate::state::AppState;
use crate::CommandError;

#[tauri::command]
pub fn library_tracks(state: State<'_, AppState>, query: TrackQuery) -> Result<TrackPage, CommandError> {
    let page = state.db.with(|conn| {
        let total = tracks::count(conn, &query)?;
        let items = tracks::list(conn, &query)?;
        Ok(TrackPage { items, total })
    })?;
    Ok(page)
}

#[tauri::command]
pub fn library_stats(state: State<'_, AppState>) -> Result<LibraryStats, CommandError> {
    Ok(state.db.with(|conn| tracks::stats(conn))?)
}
