use std::fs;
use std::path::Path;

use crate::CommandError;

const MAX_BYTES: u64 = 12 * 1024 * 1024;

/// Copies an image chosen by the user into the cover cache.
/// The source is never modified; only a decodable image is kept.
pub(crate) fn import_cover(cache_dir: &Path, source: &str) -> Result<String, CommandError> {
    let path = Path::new(source);
    let metadata = fs::metadata(path).map_err(|_| CommandError::Invalid("Image introuvable.".into()))?;
    if !metadata.is_file() || metadata.len() > MAX_BYTES {
        return Err(CommandError::Invalid("Image invalide ou trop volumineuse.".into()));
    }
    let data = fs::read(path).map_err(|_| CommandError::Invalid("Image illisible.".into()))?;
    kalo_library::store_cover(cache_dir, &data, None)
        .ok_or_else(|| CommandError::Invalid("Format d'image non pris en charge.".into()))
}
