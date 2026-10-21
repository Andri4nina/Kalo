use kalo_core::{TrackPage, TrackQuery};
use tauri::State;

use kalo_database::tracks;

use crate::state::AppState;
use crate::CommandError;

#[tauri::command]
pub fn favorites_toggle(state: State<'_, AppState>, track_id: i64) -> Result<bool, CommandError> {
    Ok(state.db.with(|conn| tracks::toggle_favorite(conn, track_id))?)
}

#[tauri::command]
pub fn favorites_list(state: State<'_, AppState>, limit: i64, offset: i64) -> Result<TrackPage, CommandError> {
    let query = TrackQuery {
        search: None,
        sort: "added".to_owned(),
        favorites_only: true,
        playlist_id: None,
        limit,
        offset,
        format: None,
        availability: None,
        min_duration_ms: None,
        max_duration_ms: None,
    };
    let page = state.db.with(|conn| {
        let total = tracks::count(conn, &query)?;
        let items = tracks::list(conn, &query)?;
        Ok(TrackPage { items, total })
    })?;
    Ok(page)
}
