use std::fs::File;
use std::io::{Read, Write};
use std::sync::atomic::Ordering;
use std::time::Instant;

use super::request::Opened;
use super::{Control, MAX_BYTES};
use crate::DownloadError;

/// Copies the body into `file`, checking the flags between chunks. Returns
/// the bytes on disk; a server sending more than announced is stopped at 2 GB.
pub fn copy(
    mut opened: Opened,
    file: &mut File,
    control: &Control<'_>,
    progress: &dyn Fn(u64, Option<u64>, u64),
) -> Result<u64, DownloadError> {
    let (mut have, total) = (opened.have, opened.total);
    let (started, start_have, mut buffer) = (Instant::now(), have, vec![0u8; 64 * 1024]);
    loop {
        if control.cancel.load(Ordering::Relaxed) {
            return Err(DownloadError::Cancelled);
        }
        if control.pause.load(Ordering::Relaxed) {
            return Err(DownloadError::Paused);
        }
        let read = opened
            .reader
            .read(&mut buffer)
            .map_err(|error| DownloadError::Network(error.to_string()))?;
        if read == 0 {
            return Ok(have);
        }
        file.write_all(&buffer[..read])?;
        have += read as u64;
        if have > MAX_BYTES {
            return Err(DownloadError::Rejected("fichier trop volumineux (2 Go maximum)".into()));
        }
        let elapsed = started.elapsed().as_secs_f64().max(0.001);
        progress(have, total, ((have - start_have) as f64 / elapsed) as u64);
    }
}
