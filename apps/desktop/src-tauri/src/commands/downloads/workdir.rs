use std::path::{Path, PathBuf};

use crate::state::AppState;

/// Kalo-owned folder holding the partial file of a download.
pub fn work_dir(state: &AppState, id: i64) -> PathBuf {
    state
        .db_path
        .parent()
        .map(PathBuf::from)
        .unwrap_or_default()
        .join("downloads")
        .join(id.to_string())
}

/// File name kept for the library copy (safe on every system).
pub fn final_path(dir: &Path, name: &str) -> PathBuf {
    let extension = Path::new(name)
        .extension()
        .and_then(|value| value.to_str())
        .unwrap_or("mp3");
    let stem = Path::new(name)
        .file_stem()
        .and_then(|value| value.to_str())
        .unwrap_or("telechargement");
    dir.join(format!(
        "{}.{}",
        kalo_library::safe_name(stem, "telechargement"),
        extension.to_ascii_lowercase()
    ))
}
