use kalo_database::downloads;
use kalo_downloads::DownloadError;
use tauri::{AppHandle, Emitter, Manager};

use super::state::{DownloadState, Flags};
use super::transfer::transfer;
use super::workdir::work_dir;
use crate::state::AppState;

/// Background body of a download: transfer, checks, filing, final state.
/// A paused transfer keeps its partial file to resume with HTTP `Range`.
pub fn run(app: AppHandle, id: i64, flags: Flags) {
    let state = app.state::<AppState>();
    let (status, error) = match transfer(&app, id, &flags) {
        Ok(()) => ("done", None),
        Err(DownloadError::Paused) => ("paused", None),
        Err(DownloadError::Cancelled) => ("cancelled", None),
        Err(failure) => ("failed", Some(failure.to_string())),
    };
    if status != "paused" {
        let _ = std::fs::remove_dir_all(work_dir(&state, id));
    }
    let _ = state
        .db
        .with(|conn| downloads::set_status(conn, id, status, error.as_deref()));
    app.state::<DownloadState>().end(id);
    let _ = app.emit("download:finished", id);
}
