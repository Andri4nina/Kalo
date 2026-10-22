use realfft::num_complex::Complex32;

use crate::dsp::{OverlapAdd, Stft, BINS, MODEL_BINS, SPLIT};

/// Working buffers reused from one split to the next (bounded memory).
pub struct Workspace {
    pub stft: Stft,
    pub spectra: Vec<Complex32>,
    pub magnitudes: Vec<f32>,
    pub masks: [Vec<f32>; 4],
    pub scaled: Vec<Complex32>,
    /// One overlap-add per output and channel.
    pub ola: [[OverlapAdd; 2]; 5],
    /// Finished samples waiting for the sink, per output and channel.
    pub outputs: [[Vec<f32>; 2]; 5],
}

impl Workspace {
    pub fn new() -> Self {
        Self {
            stft: Stft::new(),
            spectra: vec![Complex32::default(); 2 * SPLIT * BINS],
            magnitudes: vec![0.0; 2 * SPLIT * MODEL_BINS],
            masks: Default::default(),
            scaled: vec![Complex32::default(); BINS],
            ola: Default::default(),
            outputs: Default::default(),
        }
    }

    /// End of stream: every overlap-add releases its remaining samples.
    pub fn finish(&mut self) {
        for (output, pair) in self.ola.iter_mut().enumerate() {
            for (channel, accumulator) in pair.iter_mut().enumerate() {
                accumulator.finish(&mut self.outputs[output][channel]);
            }
        }
    }
}
