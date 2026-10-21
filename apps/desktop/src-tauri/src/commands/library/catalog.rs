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

#[tauri::command]
pub fn library_update_track(state: State<'_, AppState>, track_id: i64, title: String, artist: String, album: Option<String>, genre: Option<String>, year: Option<i64>) -> Result<(), CommandError> {
    let title = title.trim().to_string();
    let artist = artist.trim().to_string();
    if title.is_empty() || artist.is_empty() {
        return Err(CommandError::Invalid("Titre et artiste ne peuvent pas être vides.".into()));
    }
    state.db.with(|conn| {
        if !tracks::update(conn, track_id, &title, &artist, album.as_deref().filter(|v| !v.trim().is_empty()), genre.as_deref().filter(|v| !v.trim().is_empty()), year)? {
            return Err(CommandError::NotFound);
        }
        Ok(())
    })?;
    Ok(())
}
