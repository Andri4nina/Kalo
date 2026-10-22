use std::fs;
use std::path::Path;

use tauri::{App, AppHandle, Manager};

use kalo_database::{Database, DbResult};

use crate::state::AppState;
use crate::watch::FolderWatch;

pub fn init(app: &mut App) -> Result<(), Box<dyn std::error::Error>> {
    let data_dir = app.path().app_data_dir()?;
    let cache_dir = app.path().app_cache_dir()?;
    fs::create_dir_all(&data_dir)?;
    fs::create_dir_all(&cache_dir)?;
    let db_path = data_dir.join("kalo.db");
    let db = Database::open(&db_path)?;
    app.asset_protocol_scope().allow_directory(&cache_dir, true)?;
    allow_library_roots(app.handle(), &db)?;
    app.manage(AppState {
        db,
        db_path,
        cache_dir,
        scanning: Default::default(),
    });
    app.manage(FolderWatch::default());
    Ok(())
}

/// Extends the asset scope to every indexed root still present on disk. Called
/// at startup and after restoring a backup whose roots may differ.
pub fn allow_library_roots(app: &AppHandle, db: &Database) -> DbResult<()> {
    let scope = app.asset_protocol_scope();
    for root in db.with(|conn| kalo_database::roots::list(conn))? {
        if Path::new(&root.path).is_dir() {
            let _ = scope.allow_directory(&root.path, true);
        }
    }
    Ok(())
}
