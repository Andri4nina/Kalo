use crate::StemError;

/// Receives finished stereo blocks of one output (index in `OUTPUT_NAMES`).
pub trait StemSink {
    fn write(&mut self, output: usize, left: &[f32], right: &[f32]) -> Result<(), StemError>;
}

/// Hands every complete stereo block to the sink, never past the signal length.
pub fn flush(
    sink: &mut dyn StemSink,
    outputs: &mut [[Vec<f32>; 2]; 5],
    written: &mut [usize; 5],
    length: usize,
) -> Result<(), StemError> {
    for (output, pair) in outputs.iter_mut().enumerate() {
        let ready = pair[0].len().min(pair[1].len());
        let keep = ready.min(length.saturating_sub(written[output]));
        if keep > 0 {
            sink.write(output, &pair[0][..keep], &pair[1][..keep])?;
            written[output] += keep;
        }
        pair[0].drain(..ready);
        pair[1].drain(..ready);
    }
    Ok(())
}
