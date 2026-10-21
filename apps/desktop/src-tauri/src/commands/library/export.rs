use std::path::Path;

use base64::Engine as _;
use tauri::State;

use kalo_database::tracks;

use crate::state::AppState;
use crate::CommandError;

#[tauri::command]
pub fn library_export_wav(
    state: State<'_, AppState>,
    track_id: i64,
    destination: String,
    data: String,
) -> Result<(), CommandError> {
    let path = Path::new(&destination);
    let is_wav = path
        .extension()
        .and_then(|value| value.to_str())
        .is_some_and(|value| value.eq_ignore_ascii_case("wav"));
    if !is_wav {
        return Err(CommandError::Invalid(
            "Le fichier exporté doit avoir l'extension .wav.".into(),
        ));
    }
    let source = state
        .db
        .with(|conn| tracks::find_path(conn, track_id))?
        .ok_or_else(|| CommandError::Invalid("Morceau introuvable.".into()))?;
    if same_file(&source, &destination) {
        return Err(CommandError::Invalid(
            "L'export ne peut pas remplacer le fichier d'origine.".into(),
        ));
    }
    let bytes = base64::engine::general_purpose::STANDARD
        .decode(data)
        .map_err(|_| CommandError::Invalid("Données audio illisibles.".into()))?;
    std::fs::write(path, bytes).map_err(|error| CommandError::Invalid(format!("Écriture impossible : {error}")))?;
    Ok(())
}

fn same_file(source: &str, destination: &str) -> bool {
    match (dunce::canonicalize(source), dunce::canonicalize(destination)) {
        (Ok(from), Ok(to)) => from == to,
        _ => false,
    }
}
