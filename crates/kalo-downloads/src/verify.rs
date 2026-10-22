use std::fs::File;
use std::io::Read;
use std::path::Path;

use md5::{Digest, Md5};

use crate::DownloadError;

/// MD5 of a finished download, compared with the value the source publishes
/// (Internet Archive lists one per file). It detects corruption, not tampering.
pub fn check_md5(path: &Path, expected: &str) -> Result<(), DownloadError> {
    let mut file = File::open(path)?;
    let (mut hasher, mut buffer) = (Md5::new(), vec![0u8; 256 * 1024]);
    loop {
        let read = file.read(&mut buffer)?;
        if read == 0 {
            break;
        }
        hasher.update(&buffer[..read]);
    }
    let digest: String = hasher.finalize().iter().map(|byte| format!("{byte:02x}")).collect();
    if digest.eq_ignore_ascii_case(expected.trim()) {
        Ok(())
    } else {
        Err(DownloadError::Rejected(
            "empreinte différente de celle publiée par la source".into(),
        ))
    }
}
