use tauri::AppHandle;

use crate::watch;
use crate::CommandError;

/// Turns the folder watcher on or off; returns the resulting state.
#[tauri::command]
pub fn library_watch_set(app: AppHandle, enabled: bool) -> Result<bool, CommandError> {
    if enabled {
        watch::start(&app)?;
    } else {
        watch::stop(&app);
    }
    Ok(enabled)
}
