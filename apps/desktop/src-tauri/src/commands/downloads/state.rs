use std::collections::HashMap;
use std::sync::atomic::{AtomicBool, Ordering};
use std::sync::{Arc, Mutex, MutexGuard, PoisonError};

use crate::CommandError;

/// At most this many transfers at once, to stay light on modest machines.
const MAX_ACTIVE: usize = 3;

#[derive(Clone, Default)]
pub struct Flags {
    pub cancel: Arc<AtomicBool>,
    pub pause: Arc<AtomicBool>,
}

/// Running transfers, by download id.
#[derive(Default)]
pub struct DownloadState(Mutex<HashMap<i64, Flags>>);

impl DownloadState {
    fn map(&self) -> MutexGuard<'_, HashMap<i64, Flags>> {
        self.0.lock().unwrap_or_else(PoisonError::into_inner)
    }

    /// Registers a transfer, refusing a duplicate or a fourth one.
    pub fn begin(&self, id: i64) -> Result<Flags, CommandError> {
        let mut map = self.map();
        if map.contains_key(&id) || map.len() >= MAX_ACTIVE {
            return Err(CommandError::Invalid(format!(
                "{MAX_ACTIVE} téléchargements au maximum, ou déjà en cours."
            )));
        }
        let flags = Flags::default();
        map.insert(id, flags.clone());
        Ok(flags)
    }

    pub fn end(&self, id: i64) {
        self.map().remove(&id);
    }

    /// Raises a flag on a running transfer; false when it is not running.
    pub fn signal(&self, id: i64, cancel: bool) -> bool {
        let map = self.map();
        let Some(flags) = map.get(&id) else { return false };
        if cancel { &flags.cancel } else { &flags.pause }.store(true, Ordering::Relaxed);
        true
    }
}
