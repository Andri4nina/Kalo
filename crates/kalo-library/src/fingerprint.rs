use std::path::Path;
use std::time::Instant;

use kalo_core::{FingerprintProgress, FingerprintSummary};
use kalo_database::{tracks, Database};

use crate::LibraryError;

mod hash;

pub use hash::hash_file;

/// Hashes, read-only, the files whose size is shared with another track.
pub fn fingerprint<F>(db: &Database, on_progress: F) -> Result<FingerprintSummary, LibraryError>
where
    F: Fn(FingerprintProgress),
{
    let started = Instant::now();
    let candidates = db.with(|conn| tracks::hash_candidates(conn))?;
    let total = candidates.len() as i64;
    let mut summary = FingerprintSummary::default();
    for (index, candidate) in candidates.iter().enumerate() {
        match hash_file(Path::new(&candidate.path)) {
            Ok(hash) => {
                db.with(|conn| tracks::set_content_hash(conn, candidate.id, &hash, candidate.mtime))?;
                summary.hashed += 1;
            }
            Err(_) => summary.errors += 1,
        }
        on_progress(FingerprintProgress {
            done: index as i64 + 1,
            total,
        });
    }
    summary.duration_ms = started.elapsed().as_millis() as i64;
    Ok(summary)
}
