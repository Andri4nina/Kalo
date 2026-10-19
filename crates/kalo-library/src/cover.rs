use std::fs;
use std::path::Path;

use lofty::picture::MimeType;

mod folder;
mod magic;

pub use folder::folder;

const MAX_BYTES: usize = 12 * 1024 * 1024;

/// Stores embedded artwork in Kalo's cache. The original tag is left untouched.
pub fn store(cache_dir: &Path, data: &[u8], mime: Option<&MimeType>) -> Option<String> {
    if data.is_empty() || data.len() > MAX_BYTES {
        return None;
    }
    let extension = mime.and_then(MimeType::ext).or_else(|| magic::extension(data))?;
    write(cache_dir, data, extension)
}

fn write(cache_dir: &Path, data: &[u8], extension: &str) -> Option<String> {
    let directory = cache_dir.join("covers");
    fs::create_dir_all(&directory).ok()?;
    let hash = blake3::hash(data).to_hex();
    let path = directory.join(format!("{hash}.{extension}"));
    if !path.exists() {
        fs::write(&path, data).ok()?;
    }
    Some(dunce::simplified(&path).to_string_lossy().into_owned())
}
