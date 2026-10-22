use std::path::PathBuf;

use super::plan::{audio_under, classify, Change};

/// Changed paths split by what the index must do with them.
#[derive(Default)]
pub struct Sorted {
    pub present: Vec<PathBuf>,
    pub gone: Vec<PathBuf>,
    pub rescan: bool,
}

pub fn sort(changed: &[PathBuf]) -> Sorted {
    let mut sorted = Sorted::default();
    for path in changed {
        match classify(path) {
            Change::File if path.is_file() => sorted.present.push(path.clone()),
            Change::File => sorted.gone.push(path.clone()),
            Change::Folder if path.is_dir() => sorted.present.extend(audio_under(path)),
            Change::Folder => sorted.rescan = true,
            Change::Ignore => {}
        }
    }
    sorted
}
