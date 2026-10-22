use std::path::{Path, PathBuf};

use kalo_core::LibraryChanges;
use kalo_database::{tracks, Database};

use crate::{index, paths, scan_root, LibraryError};

mod plan;
mod sort;

pub use plan::{audio_under, classify, owner, Change};

/// Applies file-system changes seen under one root: present audio files are
/// (re)indexed, vanished ones flagged missing, a vanished folder triggers a
/// rescan. Files are only read; nothing is moved or deleted.
pub fn apply_changes(
    db: &Database,
    root_id: i64,
    cache_dir: &Path,
    changed: &[PathBuf],
) -> Result<LibraryChanges, LibraryError> {
    let sorted = sort::sort(changed);
    if sorted.rescan {
        let summary = scan_root(db, root_id, cache_dir, |_| {})?;
        return Ok(LibraryChanges {
            indexed: summary.imported + summary.updated,
            missing: summary.missing,
            rescanned: true,
        });
    }
    let indexed = index::index_files(db, root_id, cache_dir, &sorted.present)?;
    let mut missing = 0;
    for path in &sorted.gone {
        if db.with(|conn| tracks::flag_missing(conn, &paths::display(path)))? {
            missing += 1;
        }
    }
    Ok(LibraryChanges {
        indexed,
        missing,
        rescanned: false,
    })
}
