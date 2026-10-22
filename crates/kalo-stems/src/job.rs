use std::fs;
use std::path::{Path, PathBuf};
use std::sync::atomic::AtomicBool;

use crate::separator::OUTPUT_NAMES;
use crate::StemError;

mod separate;

use separate::separate_into;

/// Separates `input` into `out_dir/<stem>.wav` (vocals, drums, bass, other,
/// instrumental). Files are written in a temporary folder and only moved in
/// place on success; the source file is only read.
pub fn run_job(
    input: &Path,
    model_dir: &Path,
    out_dir: &Path,
    cancel: &AtomicBool,
    progress: &dyn Fn(usize, usize),
) -> Result<Vec<PathBuf>, StemError> {
    let partial = out_dir.join(".partial");
    fs::create_dir_all(&partial)?;
    let result = separate_into(input, model_dir, &partial, cancel, progress);
    if result.is_err() {
        let _ = fs::remove_dir_all(&partial);
    }
    result?;
    let mut outputs = Vec::with_capacity(OUTPUT_NAMES.len());
    for name in OUTPUT_NAMES {
        let target = out_dir.join(format!("{name}.wav"));
        fs::rename(partial.join(format!("{name}.wav")), &target)?;
        outputs.push(target);
    }
    fs::remove_dir_all(&partial)?;
    Ok(outputs)
}
