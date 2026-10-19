use std::fs;
use std::path::Path;

use tauri::{App, Manager};

use crate::state::AppState;

pub fn init(app: &mut App) -> Result<(), Box<dyn std::error::Error>> {
    let data_dir = app.path().app_data_dir()?;
    let cache_dir = app.path().app_cache_dir()?;
    fs::create_dir_all(&data_dir)?;
    fs::create_dir_all(&cache_dir)?;
    let db = kalo_database::Database::open(&data_dir.join("kalo.db"))?;
    let scope = app.asset_protocol_scope();
    scope.allow_directory(&cache_dir, true)?;
    for root in db.with(|conn| kalo_database::roots::list(conn))? {
        if Path::new(&root.path).is_dir() {
            let _ = scope.allow_directory(&root.path, true);
        }
    }
    app.manage(AppState {
        db,
        cache_dir,
        scanning: Default::default(),
    });
    Ok(())
}
