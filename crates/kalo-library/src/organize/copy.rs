use std::fs;
use std::path::Path;

use crate::fingerprint::hash_file;

/// Copies through a temporary file, compares the BLAKE3 of both sides, then
/// renames. The source is only read; on failure only Kalo's own temporary
/// file is removed, never a user file.
pub fn verified_copy(source: &Path, target: &Path) -> Result<(), String> {
    let parent = target.parent().ok_or("Destination invalide.")?;
    fs::create_dir_all(parent).map_err(|error| format!("Dossier impossible à créer : {error}"))?;
    let name = target
        .file_name()
        .map(|value| value.to_string_lossy().into_owned())
        .unwrap_or_default();
    let temp = parent.join(format!(".{name}.kalo-part"));
    let cleanup = |message: String| {
        let _ = fs::remove_file(&temp);
        message
    };
    fs::copy(source, &temp).map_err(|error| cleanup(format!("Copie impossible : {error}")))?;
    let same = hash_file(source)
        .and_then(|left| hash_file(&temp).map(|right| left == right))
        .map_err(|error| cleanup(format!("Vérification impossible : {error}")))?;
    if !same {
        return Err(cleanup("Copie corrompue : les empreintes diffèrent.".into()));
    }
    if target.exists() {
        return Err(cleanup("Un fichier porte déjà ce nom ; rien n'a été remplacé.".into()));
    }
    fs::rename(&temp, target).map_err(|error| cleanup(format!("Finalisation impossible : {error}")))
}
