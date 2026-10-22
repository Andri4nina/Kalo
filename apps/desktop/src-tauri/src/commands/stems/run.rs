use std::path::{Path, PathBuf};
use std::sync::atomic::AtomicBool;

use kalo_core::StemProgress;
use kalo_database::stems;
use kalo_stems::StemError;
use tauri::{AppHandle, Emitter, Manager};

/// Body of a background job: separates, records the outcome, removes the
/// partial output of a failed or cancelled job (Kalo's own folder only).
pub fn run(app: &AppHandle, job: i64, source: &Path, model: &Path, out: &PathBuf, cancel: &AtomicBool) {
    let result = kalo_stems::run_job(source, model, out, cancel, &|done, total| {
        let progress = StemProgress {
            job_id: Some(job),
            done: done as u64,
            total: total as u64,
        };
        let _ = app.emit("stem:progress", progress);
    });
    let (status, error) = match &result {
        Ok(_) => ("done", None),
        Err(StemError::Cancelled) => ("cancelled", None),
        Err(error) => ("failed", Some(error.to_string())),
    };
    if result.is_err() {
        let _ = std::fs::remove_dir_all(out);
    }
    let dir = result.is_ok().then(|| out.to_string_lossy().into_owned());
    let db = &app.state::<crate::state::AppState>().db;
    let _ = db.with(|conn| stems::finish(conn, job, status, error.as_deref(), dir.as_deref()));
    let _ = app.emit("stem:finished", job);
}
