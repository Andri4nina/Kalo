//! Local instrument separation for Kalo. The engine is behind the
//! [`Separator`] trait; the ONNX Spleeter engine is loaded only for a job.

mod audio;
mod dsp;
mod error;
mod job;
pub mod models;
mod onnx;
mod pipeline;
mod separator;

pub use audio::{resample, MODEL_RATE};
pub use error::StemError;
pub use job::run_job;
pub use pipeline::{separate, StemSink};
pub use separator::{Separator, ESTIMATE_NAMES, OUTPUT_NAMES, SPLIT_VALUES};
