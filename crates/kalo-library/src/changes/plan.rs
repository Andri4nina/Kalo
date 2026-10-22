use std::path::{Path, PathBuf};

use walkdir::WalkDir;

use crate::extensions;

/// What a changed path means for the index.
#[derive(Debug, PartialEq, Eq)]
pub enum Change {
    /// A supported audio file was created, modified, renamed or removed.
    File,
    /// A folder (no extension) changed: its content must be looked at.
    Folder,
    /// Anything else (images, temporary copies, documents).
    Ignore,
}

pub fn classify(path: &Path) -> Change {
    if extensions::is_supported(path) {
        Change::File
    } else if path.is_dir() || path.extension().is_none() {
        Change::Folder
    } else {
        Change::Ignore
    }
}

/// The deepest library root containing `path`, if any.
pub fn owner(roots: &[(i64, PathBuf)], path: &Path) -> Option<i64> {
    roots
        .iter()
        .filter(|(_, root)| path.starts_with(root))
        .max_by_key(|(_, root)| root.components().count())
        .map(|(id, _)| *id)
}

/// Supported audio files below a folder (used when a whole album is added).
pub fn audio_under(folder: &Path) -> Vec<PathBuf> {
    WalkDir::new(folder)
        .follow_links(false)
        .into_iter()
        .filter_map(Result::ok)
        .map(|entry| entry.into_path())
        .filter(|path| path.is_file() && extensions::is_supported(path))
        .collect()
}
