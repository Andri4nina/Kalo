//! Downloadable model catalogue: pinned revision and SHA-256 of every file.

mod fetch;
mod files;
mod install;
mod status;

pub use files::FILES;
pub use install::install;
pub use status::{installed_size, is_installed, uninstall};

/// Hugging Face repository and frozen revision of the Spleeter 4-stem export.
pub const REPOSITORY: &str = "Best-Practice/spleeter-4stems-onnx";
pub const REVISION: &str = "486643021f18a4d057d282fff1d11b89a30e9887";
pub const LICENSE: &str = "Apache-2.0 (graphe, sherpa-onnx) ; poids Spleeter de Deezer, MIT";

/// Total download size in bytes.
pub fn download_size() -> u64 {
    FILES.iter().map(|(_, size, _)| size).sum()
}

/// File of the network for estimate `name` (`vocals`, `drums`...).
pub fn model_file(name: &str) -> String {
    format!("{name}.fp16.onnx")
}

pub fn url(file: &str) -> String {
    format!("https://huggingface.co/{REPOSITORY}/resolve/{REVISION}/{file}")
}
