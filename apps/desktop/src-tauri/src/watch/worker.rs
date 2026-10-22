use std::path::PathBuf;
use std::sync::mpsc::{Receiver, RecvTimeoutError};
use std::time::Duration;

use notify::{Event, EventKind};
use tauri::AppHandle;

use super::flush::{flush, Pending};

/// Changes are applied once the folders stay quiet for this long.
const QUIET: Duration = Duration::from_millis(1500);

/// Collects events per root until the folders go quiet, then applies them.
/// Ends when the watcher is dropped (the channel disconnects).
pub fn run(app: AppHandle, roots: Vec<(i64, PathBuf)>, events: Receiver<notify::Result<Event>>) {
    let mut pending = Pending::new();
    loop {
        match events.recv_timeout(QUIET) {
            Ok(Ok(event)) if !matches!(event.kind, EventKind::Access(_)) => {
                for path in event.paths {
                    if let Some(root) = kalo_library::owner(&roots, &path) {
                        pending.entry(root).or_default().insert(path);
                    }
                }
            }
            Ok(_) => {}
            Err(RecvTimeoutError::Timeout) => flush(&app, &mut pending),
            Err(RecvTimeoutError::Disconnected) => break,
        }
    }
}
