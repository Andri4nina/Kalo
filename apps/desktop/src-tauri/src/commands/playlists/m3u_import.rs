use std::path::{Path, PathBuf};

use kalo_core::ImportSummary;
use kalo_database::{playlists, tracks};
use tauri::State;

use crate::state::AppState;
use crate::CommandError;

use super::m3u_read;

#[tauri::command]
pub fn playlist_import_m3u(
    state: State<'_, AppState>,
    playlist_id: i64,
    source: String,
) -> Result<ImportSummary, CommandError> {
    let path = Path::new(&source);
    let content = m3u_read::read(&source)?;
    state.db.with(|conn| playlists::get_playlist(conn, playlist_id))?;
    let base = path.parent().unwrap_or(Path::new("."));
    let mut summary = ImportSummary::default();
    for line in content
        .lines()
        .map(str::trim)
        .filter(|line| !line.is_empty() && !line.starts_with('#'))
    {
        let candidate = if Path::new(line).is_absolute() {
            PathBuf::from(line)
        } else {
            base.join(line)
        };
        let Ok(canonical) = dunce::canonicalize(&candidate) else {
            summary.skipped += 1;
            continue;
        };
        let display = dunce::simplified(&canonical).to_string_lossy().into_owned();
        let id = state.db.with(|conn| tracks::find_id_by_path(conn, &display))?;
        if let Some(track_id) = id {
            state
                .db
                .with(|conn| playlists::add_track(conn, playlist_id, track_id))?;
            summary.added += 1;
        } else {
            summary.skipped += 1;
        }
    }
    Ok(summary)
}
