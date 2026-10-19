use std::path::Path;

use kalo_core::{ScanProgress, ScanSummary};

use crate::paths;

pub fn report<F: Fn(ScanProgress)>(callback: &F, summary: &ScanSummary, current: &Path) {
    callback(ScanProgress {
        scanned: summary.files_found,
        imported: summary.imported,
        errors: summary.errors,
        current: paths::display(current),
    });
}
