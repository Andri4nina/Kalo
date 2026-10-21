use kalo_database::tracks;
use tauri::State;

use crate::state::AppState;
use crate::CommandError;

#[tauri::command]
pub fn library_update_track(
    state: State<'_, AppState>,
    track_id: i64,
    title: String,
    artist: String,
    album: Option<String>,
    genre: Option<String>,
    year: Option<i64>,
) -> Result<(), CommandError> {
    let title = title.trim().to_string();
    let artist = artist.trim().to_string();
    if title.is_empty() || artist.is_empty() {
        return Err(CommandError::Invalid(
            "Titre et artiste ne peuvent pas être vides.".into(),
        ));
    }
    let changed = state.db.with(|conn| {
        tracks::update(
            conn,
            track_id,
            &title,
            &artist,
            album.as_deref().filter(|value| !value.trim().is_empty()),
            genre.as_deref().filter(|value| !value.trim().is_empty()),
            year,
        )
    })?;
    if !changed {
        return Err(CommandError::NotFound);
    }
    Ok(())
}
