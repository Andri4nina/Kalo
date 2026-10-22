use std::fs;
use std::path::{Path, PathBuf};

use crate::CommandError;

const MAX_LYRICS_BYTES: u64 = 1_000_000;

/// `chanson.lrc` (or `.LRC`) next to `chanson.mp3`, if present.
pub fn sibling(audio: &Path, extension: &str) -> Option<PathBuf> {
    [extension.to_owned(), extension.to_ascii_uppercase()]
        .into_iter()
        .map(|candidate| audio.with_extension(candidate))
        .find(|candidate| candidate.is_file())
}

/// Reads a UTF-8 lyrics file of at most 1 MB (read-only).
pub fn read_text(file: &Path) -> Result<String, CommandError> {
    let read_error = |error: std::io::Error| CommandError::Invalid(format!("Paroles illisibles : {error}"));
    if fs::metadata(file).map_err(read_error)?.len() > MAX_LYRICS_BYTES {
        return Err(CommandError::Invalid(
            "Fichier de paroles trop volumineux (1 Mo maximum).".into(),
        ));
    }
    fs::read_to_string(file).map_err(read_error)
}
