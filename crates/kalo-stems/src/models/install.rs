use std::fs;
use std::path::Path;
use std::sync::atomic::AtomicBool;

use super::fetch::fetch;
use super::{url, FILES};
use crate::StemError;

/// Downloads every missing file to `dir`, checks its SHA-256, then renames it
/// into place. `progress` receives `(bytes done, bytes total)`.
pub fn install(dir: &Path, cancel: &AtomicBool, progress: &dyn Fn(u64, u64)) -> Result<(), StemError> {
    fs::create_dir_all(dir)?;
    let total = super::download_size();
    let mut done = 0;
    for (file, size, sha) in FILES {
        let target = dir.join(file);
        if fs::metadata(&target).is_ok_and(|meta| meta.len() == size) {
            done += size;
            continue;
        }
        let part = dir.join(format!("{file}.part"));
        let result = fetch(&url(file), &part, cancel, &mut |bytes| progress(done + bytes, total))
            .and_then(|digest| verify(&digest, sha));
        if let Err(error) = result {
            let _ = fs::remove_file(&part);
            return Err(error);
        }
        fs::rename(&part, &target)?;
        done += size;
    }
    Ok(())
}

fn verify(digest: &str, expected: &str) -> Result<(), StemError> {
    if digest == expected {
        Ok(())
    } else {
        Err(StemError::Download(
            "empreinte SHA-256 inattendue, fichier rejeté".into(),
        ))
    }
}
