use std::fs;
use std::path::Path;

use crate::CommandError;

const MAX_BYTES: usize = 1_000_000;

/// Writes lyrics to a `.lrc` file chosen in the save dialog. Only `.lrc`
/// destinations are accepted, so an audio file can never be overwritten.
#[tauri::command]
pub fn lyrics_export(content: String, destination: String) -> Result<(), CommandError> {
    let path = Path::new(&destination);
    let is_lrc = path
        .extension()
        .and_then(|value| value.to_str())
        .is_some_and(|value| value.eq_ignore_ascii_case("lrc"));
    if !is_lrc {
        return Err(CommandError::Invalid("Choisissez un fichier .lrc.".into()));
    }
    if content.len() > MAX_BYTES {
        return Err(CommandError::Invalid(
            "Paroles trop volumineuses (1 Mo maximum).".into(),
        ));
    }
    fs::write(path, content.as_bytes()).map_err(|error| CommandError::Invalid(format!("Écriture impossible : {error}")))
}
