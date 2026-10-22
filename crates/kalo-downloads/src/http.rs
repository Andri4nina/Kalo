use std::fs::OpenOptions;
use std::path::Path;
use std::sync::atomic::AtomicBool;

use crate::DownloadError;

mod request;
mod stream;

/// Hard ceiling for one file (audio only): 2 GB.
pub const MAX_BYTES: u64 = 2_000_000_000;

/// Flags a running transfer reads between chunks.
pub struct Control<'a> {
    pub cancel: &'a AtomicBool,
    pub pause: &'a AtomicBool,
}

/// Downloads `url` into `part`, resuming from its current length with an HTTP
/// `Range` request when possible. `progress` gets (received, total, bytes/s).
pub fn fetch(
    url: &str,
    part: &Path,
    control: Control<'_>,
    progress: &dyn Fn(u64, Option<u64>, u64),
) -> Result<u64, DownloadError> {
    let have = std::fs::metadata(part).map(|meta| meta.len()).unwrap_or(0);
    let opened = request::open(url, have)?;
    let mut file = OpenOptions::new()
        .create(true)
        .write(true)
        .append(opened.partial)
        .truncate(!opened.partial)
        .open(part)?;
    let total = opened.total;
    let have = stream::copy(opened, &mut file, &control, progress)?;
    file.sync_all()?;
    if total.is_some_and(|value| value != have) {
        return Err(DownloadError::Rejected("transfert incomplet".into()));
    }
    Ok(have)
}
