use std::path::PathBuf;

use tauri::{AppHandle, Manager};

use crate::state::AppState;
use crate::CommandError;

/// Library roots that still exist on disk, with their id.
pub fn watched_roots(app: &AppHandle) -> Result<Vec<(i64, PathBuf)>, CommandError> {
    Ok(app
        .state::<AppState>()
        .db
        .with(|conn| kalo_database::roots::list(conn))?
        .into_iter()
        .map(|root| (root.id, PathBuf::from(root.path)))
        .filter(|(_, path)| path.is_dir())
        .collect())
}

pub fn failure(error: notify::Error) -> CommandError {
    CommandError::Invalid(format!("Surveillance des dossiers impossible : {error}"))
}
