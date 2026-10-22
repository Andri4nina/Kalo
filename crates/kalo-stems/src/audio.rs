//! Decoding, resampling to 44.1 kHz and WAV writing for separation jobs.

mod decode;
mod open;
mod resample;
mod wav;

pub use decode::decode;
pub use resample::{resample, MODEL_RATE};
pub use wav::WavWriter;
