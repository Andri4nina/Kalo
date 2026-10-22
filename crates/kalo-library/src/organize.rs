use std::path::{Path, PathBuf};

use kalo_core::FileImportReport;
use kalo_database::{roots, Database};

use crate::{index, LibraryError};

mod copy;
mod place;
mod report;
mod sanitize;
mod target;

pub use sanitize::component as safe_name;
pub use target::{next_free, target as target_path};

/// Copies chosen files into `<racine>/<Artiste>/<Titre>.<ext>`, verifies each
/// copy, then indexes it. Sources are never moved, renamed or deleted.
pub fn import_files(
    db: &Database,
    root_id: i64,
    cache_dir: &Path,
    sources: &[String],
) -> Result<FileImportReport, LibraryError> {
    let root = db.with(|conn| roots::get(conn, root_id))?;
    let root_path = PathBuf::from(&root.path);
    if !root_path.is_dir() {
        return Err(LibraryError::InvalidRoot(root.path));
    }
    let mut report = FileImportReport::default();
    let mut placed = Vec::new();
    for source in sources {
        let outcome = place::place(Path::new(source), &root_path, cache_dir);
        report::record(&mut report, &mut placed, source, outcome);
    }
    index::index_files(db, root_id, cache_dir, &placed)?;
    Ok(report)
}
