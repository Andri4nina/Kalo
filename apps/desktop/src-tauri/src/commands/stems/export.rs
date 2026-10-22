use std::fs;
use std::path::Path;

use kalo_database::stems;
use kalo_stems::OUTPUT_NAMES;
use tauri::State;

use crate::state::AppState;
use crate::CommandError;

/// Copies one generated track to a `.wav` destination chosen by the user.
#[tauri::command]
pub fn stem_export(
    state: State<'_, AppState>,
    job_id: i64,
    stem: String,
    destination: String,
) -> Result<(), CommandError> {
    if !OUTPUT_NAMES.contains(&stem.as_str()) {
        return Err(CommandError::Invalid("Piste inconnue.".into()));
    }
    let job = state.db.with(|conn| stems::get(conn, job_id))?;
    let folder = job
        .output_dir
        .ok_or_else(|| CommandError::Invalid("Séparation non terminée.".into()))?;
    let target = Path::new(&destination);
    if !target
        .extension()
        .is_some_and(|value| value.eq_ignore_ascii_case("wav"))
    {
        return Err(CommandError::Invalid("Choisissez un fichier .wav.".into()));
    }
    fs::copy(Path::new(&folder).join(format!("{stem}.wav")), target)
        .map(|_| ())
        .map_err(|error| CommandError::Invalid(format!("Export impossible : {error}")))
}
