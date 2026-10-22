use kalo_database::downloads::{self, NewDownload};
use tauri::{AppHandle, State};

use super::request::DownloadRequest;
use super::state::DownloadState;
use crate::state::AppState;
use crate::CommandError;

/// Records and starts a download. The user confirms in the interface that the
/// source allows it; only `http(s)` links are accepted.
#[tauri::command]
pub fn download_start(
    app: AppHandle,
    state: State<'_, AppState>,
    active: State<'_, DownloadState>,
    request: DownloadRequest,
) -> Result<i64, CommandError> {
    kalo_downloads::validate(&request.url).map_err(|error| CommandError::Invalid(error.to_string()))?;
    let name = request
        .file_name
        .clone()
        .unwrap_or_else(|| kalo_downloads::file_name(&request.url));
    let new = NewDownload {
        url: request.url.trim(),
        file_name: &name,
        provider: if request.provider == "archive" {
            "archive"
        } else {
            "direct"
        },
        license: request.license.as_deref(),
        expected_md5: request.md5.as_deref(),
        root_id: request.root_id,
    };
    let id = state.db.with(|conn| downloads::create(conn, &new))?;
    launch(app, &active, id)?;
    Ok(id)
}

/// Starts (or resumes) the transfer of an existing download in the background.
pub fn launch(app: AppHandle, active: &DownloadState, id: i64) -> Result<(), CommandError> {
    let flags = active.begin(id)?;
    tauri::async_runtime::spawn_blocking(move || super::run::run(app, id, flags));
    Ok(())
}
