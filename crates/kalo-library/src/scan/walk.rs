use std::path::Path;
use std::time::{Duration, Instant};

use kalo_core::{ScanProgress, ScanSummary};
use kalo_database::Database;
use walkdir::WalkDir;

use crate::LibraryError;

use super::{file, helpers, report};

const BATCH_SIZE: usize = 32;
const REPORT_EVERY: Duration = Duration::from_millis(120);

pub fn walk<F: Fn(ScanProgress)>(
    db: &Database,
    root_id: i64,
    root: &Path,
    cache_dir: &Path,
    mark: i64,
    on_progress: &F,
    summary: &mut ScanSummary,
) -> Result<(), LibraryError> {
    let mut pending = Vec::with_capacity(BATCH_SIZE);
    let mut reported_at = Instant::now();
    for entry in WalkDir::new(root).follow_links(false) {
        let entry = match entry {
            Ok(entry) => entry,
            Err(_) => {
                summary.errors += 1;
                continue;
            }
        };
        if !file::is_audio(entry.path()) {
            continue;
        }
        file::visit(db, entry.path(), root_id, cache_dir, mark, &mut pending, summary)?;
        if reported_at.elapsed() >= REPORT_EVERY {
            report::report(on_progress, summary, entry.path());
            reported_at = Instant::now();
        }
        if pending.len() >= BATCH_SIZE {
            helpers::flush(db, &mut pending, summary)?;
        }
    }
    helpers::flush(db, &mut pending, summary)
}
