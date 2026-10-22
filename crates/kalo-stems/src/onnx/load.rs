use std::path::Path;

use ort::session::Session;

use super::{engine, OnnxSeparator};
use crate::models::model_file;
use crate::separator::ESTIMATE_NAMES;
use crate::StemError;

impl OnnxSeparator {
    /// Loads the four networks from `dir`, with at most `threads` CPU threads each.
    pub fn load(dir: &Path, threads: usize) -> Result<Self, StemError> {
        let environment = ort::init().with_name("kalo-stems").build().map_err(engine)?;
        let mut sessions = Vec::with_capacity(ESTIMATE_NAMES.len());
        for name in ESTIMATE_NAMES {
            let path = dir.join(model_file(name));
            if !path.is_file() {
                return Err(StemError::Model(format!("{} manquant", path.display())));
            }
            let mut builder = Session::builder(&environment)
                .map_err(engine)?
                .with_intra_threads(threads.max(1))
                .map_err(engine)?;
            sessions.push(builder.commit_from_file(&path).map_err(engine)?);
        }
        Ok(Self { sessions })
    }
}
