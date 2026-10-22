use std::fs;
use std::io::{Read, Write};
use std::path::Path;
use std::sync::atomic::{AtomicBool, Ordering};

use sha2::{Digest, Sha256};

use crate::StemError;

/// Streams `url` into `path`, hashing on the fly; returns the hex SHA-256.
pub fn fetch(url: &str, path: &Path, cancel: &AtomicBool, progress: &mut dyn FnMut(u64)) -> Result<String, StemError> {
    let response = ureq::get(url)
        .call()
        .map_err(|error| StemError::Download(error.to_string()))?;
    let mut reader = response.into_body().into_reader();
    let mut file = fs::File::create(path)?;
    let (mut hasher, mut buffer, mut bytes) = (Sha256::new(), vec![0u8; 64 * 1024], 0u64);
    loop {
        if cancel.load(Ordering::Relaxed) {
            return Err(StemError::Cancelled);
        }
        let read = reader.read(&mut buffer)?;
        if read == 0 {
            break;
        }
        hasher.update(&buffer[..read]);
        file.write_all(&buffer[..read])?;
        bytes += read as u64;
        progress(bytes);
    }
    file.sync_all()?;
    Ok(hasher.finalize().iter().map(|byte| format!("{byte:02x}")).collect())
}
