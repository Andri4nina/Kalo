use std::path::{Path, PathBuf};

use kalo_database::Database;

use crate::{batch, metadata, scan::helpers, track, LibraryError};

/// Indexes specific files of a root (after an import) without walking it all.
/// Returns how many tracks were inserted or refreshed.
pub fn index_files(db: &Database, root_id: i64, cache_dir: &Path, files: &[PathBuf]) -> Result<i64, LibraryError> {
    let mark = helpers::mark();
    let mut pending = files
        .iter()
        .filter_map(|path| {
            metadata::read(path, cache_dir)
                .ok()
                .map(|meta| track::build(path, root_id, mark, meta))
        })
        .collect::<Vec<_>>();
    let outcome = batch::flush(db, &mut pending)?;
    Ok(outcome.imported + outcome.updated)
}
