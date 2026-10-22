use std::path::{Path, PathBuf};

use crate::{extensions, fingerprint::hash_file, metadata, paths};

use super::copy::verified_copy;
use super::target::{next_free, target};

pub enum Placed {
    Copied(PathBuf),
    Present(PathBuf),
}

/// Places one file in the root: kept as is when already inside it, skipped when
/// an identical copy exists, otherwise copied under a free name and verified.
pub fn place(source: &Path, root: &Path, cache_dir: &Path) -> Result<Placed, String> {
    if !source.is_file() || !extensions::is_supported(source) {
        return Err("Fichier introuvable ou format non pris en charge.".into());
    }
    let canonical = dunce::canonicalize(source).map_err(|error| error.to_string())?;
    let canonical_root = dunce::canonicalize(root).map_err(|error| error.to_string())?;
    if canonical.starts_with(&canonical_root) {
        return Ok(Placed::Present(canonical));
    }
    let meta = metadata::read(source, cache_dir)?;
    let title = meta.title.unwrap_or_else(|| paths::fallback_title(source));
    let extension = source
        .extension()
        .map(|value| value.to_string_lossy().into_owned())
        .unwrap_or_default();
    let wanted = target(root, meta.artist.as_deref(), &title, &extension);
    if wanted.exists() && hash_file(&wanted).ok() == hash_file(source).ok() {
        return Ok(Placed::Present(wanted));
    }
    let destination = next_free(&wanted);
    verified_copy(source, &destination)?;
    Ok(Placed::Copied(destination))
}
