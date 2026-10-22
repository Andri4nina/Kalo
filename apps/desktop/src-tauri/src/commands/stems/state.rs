use std::path::PathBuf;
use std::sync::atomic::{AtomicBool, Ordering};
use std::sync::{Arc, Mutex, PoisonError};

use crate::state::{AppState, ScanSlot};
use crate::CommandError;

/// One separation or model download at a time, with a cancellation flag.
#[derive(Default)]
pub struct StemState {
    pub slot: ScanSlot,
    cancel: Mutex<Arc<AtomicBool>>,
}

impl StemState {
    /// Fresh cancellation flag for the task that starts now.
    pub fn arm(&self) -> Arc<AtomicBool> {
        let flag = Arc::new(AtomicBool::new(false));
        *self.cancel.lock().unwrap_or_else(PoisonError::into_inner) = flag.clone();
        flag
    }

    pub fn cancel(&self) {
        self.cancel
            .lock()
            .unwrap_or_else(PoisonError::into_inner)
            .store(true, Ordering::Relaxed);
    }
}

fn data_dir(state: &AppState) -> PathBuf {
    state.db_path.parent().map(PathBuf::from).unwrap_or_default()
}

/// Kalo-owned folder of the downloaded networks.
pub fn model_dir(state: &AppState) -> PathBuf {
    data_dir(state).join("models").join("spleeter-4stems")
}

/// Kalo-owned folder holding the outputs of every job.
pub fn stems_root(state: &AppState) -> PathBuf {
    data_dir(state).join("stems")
}

pub fn stem_error(error: kalo_stems::StemError) -> CommandError {
    CommandError::Invalid(error.to_string())
}
