use std::fs;
use std::path::Path;

use super::{magic, write, MAX_BYTES};

const FOLDER_NAMES: &[&str] = &[
    "cover.jpg",
    "cover.jpeg",
    "cover.png",
    "cover.webp",
    "folder.jpg",
    "folder.jpeg",
    "folder.png",
    "front.jpg",
    "front.png",
];

/// Falls back to common sidecar artwork files without altering them.
pub fn folder(audio: &Path, cache_dir: &Path) -> Option<String> {
    let parent = audio.parent()?;
    for name in FOLDER_NAMES {
        let Ok(data) = fs::read(parent.join(name)) else {
            continue;
        };
        if data.len() > MAX_BYTES {
            continue;
        }
        if let Some(extension) = magic::extension(&data) {
            return write(cache_dir, &data, extension);
        }
    }
    None
}
