use std::path::Path;

use kalo_core::{NewTrack, ScanSummary};
use kalo_database::Database;

use crate::{extensions, metadata, track, LibraryError};

use super::helpers;

pub fn is_audio(path: &Path) -> bool {
    path.is_file() && extensions::is_supported(path)
}

pub fn visit(
    db: &Database,
    path: &Path,
    root_id: i64,
    cache_dir: &Path,
    mark: i64,
    pending: &mut Vec<NewTrack>,
    summary: &mut ScanSummary,
) -> Result<(), LibraryError> {
    summary.files_found += 1;
    match metadata::read(path, cache_dir) {
        Ok(meta) => pending.push(track::build(path, root_id, mark, meta)),
        Err(_) => {
            summary.errors += 1;
            helpers::touch(db, path, mark)?;
        }
    }
    Ok(())
}
