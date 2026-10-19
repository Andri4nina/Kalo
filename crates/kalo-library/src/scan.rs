use std::path::Path;
use std::time::Instant;

use kalo_core::{ScanProgress, ScanSummary};
use kalo_database::{roots, Database};

use crate::LibraryError;

mod file;
mod helpers;
mod report;
mod walk;

/// Scans a root in place. Files are only read; nothing is moved or deleted.
pub fn scan_root<F>(db: &Database, root_id: i64, cache_dir: &Path, on_progress: F) -> Result<ScanSummary, LibraryError>
where
    F: Fn(ScanProgress),
{
    let root = db.with(|conn| roots::get(conn, root_id))?;
    let root_path = Path::new(&root.path);
    if !root_path.is_dir() {
        return Err(LibraryError::InvalidRoot(root.path));
    }
    let started = Instant::now();
    let mark = helpers::mark();
    let mut summary = ScanSummary::default();
    walk::walk(db, root_id, root_path, cache_dir, mark, &on_progress, &mut summary)?;
    summary.missing = helpers::finish(db, root_id, mark)?;
    summary.duration_ms = started.elapsed().as_millis() as i64;
    report::report(&on_progress, &summary, root_path);
    Ok(summary)
}
