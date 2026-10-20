use std::path::PathBuf;
use std::sync::atomic::{AtomicBool, Ordering};
use std::sync::Arc;

use kalo_database::Database;

pub struct AppState {
    pub db: Database,
    pub db_path: PathBuf,
    pub cache_dir: PathBuf,
    pub scanning: ScanSlot,
}

/// One scan at a time, released even if the blocking task panics.
#[derive(Clone, Default)]
pub struct ScanSlot(Arc<AtomicBool>);

pub struct ScanLease(Arc<AtomicBool>);

impl ScanSlot {
    pub fn try_acquire(&self) -> Option<ScanLease> {
        self.0
            .compare_exchange(false, true, Ordering::AcqRel, Ordering::Acquire)
            .ok()
            .map(|_| ScanLease(self.0.clone()))
    }

    pub fn is_active(&self) -> bool {
        self.0.load(Ordering::Acquire)
    }
}

impl Drop for ScanLease {
    fn drop(&mut self) {
        self.0.store(false, Ordering::Release);
    }
}
