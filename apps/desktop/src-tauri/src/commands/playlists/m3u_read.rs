use std::fs;
use std::path::Path;

use crate::CommandError;

const MAX_BYTES: u64 = 2_000_000;

pub fn read(source: &str) -> Result<String, CommandError> {
    let path = Path::new(source);
    let metadata = fs::metadata(path).map_err(|_| CommandError::Invalid("Fichier M3U introuvable.".into()))?;
    if !metadata.is_file() || metadata.len() > MAX_BYTES {
        return Err(CommandError::Invalid("Fichier M3U invalide ou trop volumineux.".into()));
    }
    let content =
        fs::read_to_string(path).map_err(|_| CommandError::Invalid("Le fichier M3U doit être en UTF-8.".into()))?;
    if !content.lines().any(|line| line.trim_start().starts_with("#EXTM3U")) {
        return Err(CommandError::Invalid("Ce fichier n'est pas une playlist M3U.".into()));
    }
    Ok(content)
}
