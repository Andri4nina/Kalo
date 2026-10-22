use std::cell::Cell;
use std::time::{Duration, Instant};

use kalo_core::DownloadProgress;
use kalo_database::downloads;
use kalo_downloads::{fetch, Control, DownloadError};
use tauri::{AppHandle, Emitter, Manager};

use super::finish::finish;
use super::state::Flags;
use super::workdir::{final_path, work_dir};
use crate::state::AppState;

/// Fetches, checks and files one download.
pub fn transfer(app: &AppHandle, id: i64, flags: &Flags) -> Result<(), DownloadError> {
    let state = app.state::<AppState>();
    let failure = |error: kalo_database::DbError| DownloadError::Service(error.to_string());
    let entry = state.db.with(|conn| downloads::get(conn, id)).map_err(failure)?;
    let md5 = state
        .db
        .with(|conn| downloads::expected_md5(conn, id))
        .map_err(failure)?;
    let dir = work_dir(&state, id);
    std::fs::create_dir_all(&dir)?;
    let file = final_path(&dir, &entry.file_name);
    let part = dir.join("download.part");
    let saved = Cell::new(Instant::now());
    let control = Control {
        cancel: &flags.cancel,
        pause: &flags.pause,
    };
    fetch(&entry.url, &part, control, &|received, total, bytes_per_second| {
        let _ = app.emit(
            "download:progress",
            DownloadProgress {
                id,
                received,
                total,
                bytes_per_second,
            },
        );
        if saved.get().elapsed() > Duration::from_secs(1) {
            saved.set(Instant::now());
            let _ = state.db.with(|conn| downloads::progress(conn, id, received, total));
        }
    })?;
    finish(app, &part, &file, md5.as_deref(), entry.root_id).map_err(DownloadError::Rejected)
}
