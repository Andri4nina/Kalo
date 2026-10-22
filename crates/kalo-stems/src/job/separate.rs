use std::path::Path;
use std::sync::atomic::AtomicBool;

use crate::audio::{decode, resample, WavWriter, MODEL_RATE};
use crate::onnx::OnnxSeparator;
use crate::pipeline::{separate, StemSink};
use crate::separator::OUTPUT_NAMES;
use crate::StemError;

struct WavSink(Vec<WavWriter>);

impl StemSink for WavSink {
    fn write(&mut self, output: usize, left: &[f32], right: &[f32]) -> Result<(), StemError> {
        Ok(self.0[output].write(left, right)?)
    }
}

pub fn separate_into(
    input: &Path,
    model_dir: &Path,
    dir: &Path,
    cancel: &AtomicBool,
    progress: &dyn Fn(usize, usize),
) -> Result<(), StemError> {
    let decoded = decode(input)?;
    let channels = decoded
        .channels
        .map(|channel| resample(&channel, decoded.rate, MODEL_RATE));
    let threads = std::thread::available_parallelism().map_or(2, |count| (count.get() / 2).max(1));
    let mut separator = OnnxSeparator::load(model_dir, threads)?;
    let writers = OUTPUT_NAMES
        .iter()
        .map(|name| WavWriter::create(&dir.join(format!("{name}.wav"))))
        .collect::<Result<Vec<_>, _>>()?;
    let mut sink = WavSink(writers);
    separate(
        [&channels[0], &channels[1]],
        &mut separator,
        &mut sink,
        cancel,
        progress,
    )?;
    sink.0.into_iter().try_for_each(WavWriter::finish)?;
    Ok(())
}
