use std::path::{Path, PathBuf};

use crate::extensions;

use super::sanitize::component;

/// `<racine>/<Artiste>/<Titre>.<ext>`, or `<racine>/<Artiste>/video/<Titre>.<ext>`
/// for a clip, with safe names.
pub fn target(root: &Path, artist: Option<&str>, title: &str, extension: &str) -> PathBuf {
    let folder = root.join(component(artist.unwrap_or_default(), "Artiste inconnu"));
    let file = format!("{}.{}", component(title, "Sans titre"), extension.to_ascii_lowercase());
    if extensions::is_video(Path::new(&file)) {
        folder.join("video").join(file)
    } else {
        folder.join(file)
    }
}

/// First free name: `Titre.mp3`, then `Titre (2).mp3`, `Titre (3).mp3`...
pub fn next_free(path: &Path) -> PathBuf {
    if !path.exists() {
        return path.to_path_buf();
    }
    let stem = path
        .file_stem()
        .map(|value| value.to_string_lossy().into_owned())
        .unwrap_or_default();
    let extension = path
        .extension()
        .map(|value| value.to_string_lossy().into_owned())
        .unwrap_or_default();
    let parent = path.parent().map(Path::to_path_buf).unwrap_or_default();
    (2..)
        .map(|index| parent.join(format!("{stem} ({index}).{extension}")))
        .find(|candidate| !candidate.exists())
        .unwrap_or_else(|| path.to_path_buf())
}
