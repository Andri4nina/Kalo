use std::fs;
use std::path::Path;

use super::FILES;
use crate::StemError;

/// True when every file is present with its expected size.
pub fn is_installed(dir: &Path) -> bool {
    FILES
        .iter()
        .all(|(file, size, _)| fs::metadata(dir.join(file)).is_ok_and(|meta| meta.len() == *size))
}

pub fn installed_size(dir: &Path) -> u64 {
    FILES
        .iter()
        .filter_map(|(file, ..)| fs::metadata(dir.join(file)).ok())
        .map(|meta| meta.len())
        .sum()
}

/// Removes the downloaded networks (only Kalo's own model files).
pub fn uninstall(dir: &Path) -> Result<(), StemError> {
    for (file, ..) in FILES {
        let path = dir.join(file);
        if path.exists() {
            fs::remove_file(path)?;
        }
    }
    Ok(())
}
