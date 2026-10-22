use std::sync::Arc;

use realfft::num_complex::Complex32;
use realfft::{RealFftPlanner, RealToComplex};

use super::window::{periodic_hann, HOP, N_FFT, PAD};

/// Forward STFT of one channel, frame by frame, over the virtually padded signal.
pub struct Stft {
    fft: Arc<dyn RealToComplex<f32>>,
    window: Vec<f32>,
    frame: Vec<f32>,
    scratch: Vec<Complex32>,
}

impl Stft {
    pub fn new() -> Self {
        let fft = RealFftPlanner::<f32>::new().plan_fft_forward(N_FFT);
        let scratch = fft.make_scratch_vec();
        Self {
            fft,
            window: periodic_hann(),
            frame: vec![0.0; N_FFT],
            scratch,
        }
    }

    /// Spectrum of frame `index` of `signal` (front-padded with `PAD` zeros).
    pub fn frame(&mut self, signal: &[f32], index: usize, spectrum: &mut [Complex32]) {
        let start = index * HOP;
        for (offset, slot) in self.frame.iter_mut().enumerate() {
            let position = (start + offset).checked_sub(PAD);
            let sample = position.and_then(|at| signal.get(at)).copied().unwrap_or(0.0);
            *slot = sample * self.window[offset];
        }
        // Lengths are fixed by construction, so the transform cannot fail.
        let _ = self
            .fft
            .process_with_scratch(&mut self.frame, spectrum, &mut self.scratch);
    }
}

impl Default for Stft {
    fn default() -> Self {
        Self::new()
    }
}
