use std::collections::{HashMap, HashSet};
use std::path::PathBuf;

use kalo_core::LibraryChanges;
use tauri::{AppHandle, Emitter, Manager};

use crate::state::AppState;

pub type Pending = HashMap<i64, HashSet<PathBuf>>;

/// Applies pending changes when no analysis or import holds the slot;
/// otherwise keeps them for the next quiet period.
pub fn flush(app: &AppHandle, pending: &mut Pending) {
    if pending.is_empty() {
        return;
    }
    let state = app.state::<AppState>();
    let Some(_lease) = state.scanning.try_acquire() else {
        return;
    };
    let mut total = LibraryChanges::default();
    for (root, paths) in pending.drain() {
        let paths: Vec<PathBuf> = paths.into_iter().collect();
        if let Ok(changes) = kalo_library::apply_changes(&state.db, root, &state.cache_dir, &paths) {
            total.indexed += changes.indexed;
            total.missing += changes.missing;
            total.rescanned |= changes.rescanned;
        }
    }
    if total.indexed + total.missing > 0 || total.rescanned {
        let _ = app.emit("library:changed", total);
    }
}
