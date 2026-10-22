use std::path::PathBuf;

use kalo_core::{FileImportFailure, FileImportReport};

use super::place::Placed;

/// Adds one placement outcome to the report; placed files are kept for indexing.
pub fn record(report: &mut FileImportReport, placed: &mut Vec<PathBuf>, source: &str, outcome: Result<Placed, String>) {
    match outcome {
        Ok(Placed::Copied(path)) => {
            report.copied += 1;
            placed.push(path);
        }
        Ok(Placed::Present(path)) => {
            report.already_present += 1;
            placed.push(path);
        }
        Err(reason) => report.failed.push(FileImportFailure {
            path: source.to_owned(),
            reason,
        }),
    }
}
