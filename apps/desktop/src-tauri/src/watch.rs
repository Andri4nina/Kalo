use std::sync::{Mutex, MutexGuard, PoisonError};

use notify::{RecommendedWatcher, RecursiveMode, Watcher};
use tauri::{AppHandle, Manager};

use crate::CommandError;

mod flush;
mod roots;
mod worker;

/// Active folder watcher; dropping it ends the worker thread.
#[derive(Default)]
pub struct FolderWatch(Mutex<Option<RecommendedWatcher>>);

fn slot(app: &AppHandle) -> MutexGuard<'_, Option<RecommendedWatcher>> {
    let watch = app.state::<FolderWatch>().inner();
    watch.0.lock().unwrap_or_else(PoisonError::into_inner)
}

/// Watches every existing root recursively, replacing a previous watcher.
pub fn start(app: &AppHandle) -> Result<(), CommandError> {
    let roots = roots::watched_roots(app)?;
    let (sender, events) = std::sync::mpsc::channel();
    let mut watcher = notify::recommended_watcher(sender).map_err(roots::failure)?;
    for (_, path) in &roots {
        watcher.watch(path, RecursiveMode::Recursive).map_err(roots::failure)?;
    }
    let handle = app.clone();
    std::thread::spawn(move || worker::run(handle, roots, events));
    *slot(app) = Some(watcher);
    Ok(())
}

pub fn stop(app: &AppHandle) {
    slot(app).take();
}

/// Restarts the watcher after the roots changed, only if it was running.
pub fn refresh(app: &AppHandle) -> Result<(), CommandError> {
    let active = slot(app).is_some();
    if active {
        start(app)?;
    }
    Ok(())
}
