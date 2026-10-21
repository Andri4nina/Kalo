use std::fs;
use std::path::Path;

use kalo_database::playlists;
use tauri::State;

use crate::state::AppState;
use crate::CommandError;

#[tauri::command]
pub fn playlist_export_m3u(
    state: State<'_, AppState>,
    playlist_id: i64,
    destination: String,
) -> Result<(), CommandError> {
    let path = Path::new(&destination);
    let valid = path
        .extension()
        .and_then(|value| value.to_str())
        .is_some_and(|value| value.eq_ignore_ascii_case("m3u") || value.eq_ignore_ascii_case("m3u8"));
    if !valid {
        return Err(CommandError::Invalid(
            "Le fichier doit avoir l'extension .m3u ou .m3u8.".into(),
        ));
    }
    let tracks = state.db.with(|conn| {
        playlists::get_playlist(conn, playlist_id)?;
        playlists::list_tracks(conn, playlist_id)
    })?;
    let mut content = String::from("#EXTM3U\n");
    for track in &tracks {
        let artist = track.artist.as_deref().unwrap_or("Artiste inconnu");
        content.push_str(&format!(
            "#EXTINF:{},{artist} - {}\n{}\n",
            track.duration_ms / 1000,
            track.title,
            track.path
        ));
    }
    fs::write(path, content).map_err(|error| CommandError::Invalid(format!("Écriture impossible : {error}")))?;
    Ok(())
}
