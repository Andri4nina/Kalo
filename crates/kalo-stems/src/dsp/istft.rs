use std::sync::Arc;

use realfft::num_complex::Complex32;
use realfft::ComplexToReal;

use super::window::{HOP, N_FFT};

mod lifecycle;
mod release;

/// Streaming inverse STFT by weighted overlap-add. Samples are released as
/// soon as no later frame can still contribute to them.
pub struct OverlapAdd {
    pub(super) ifft: Arc<dyn ComplexToReal<f32>>,
    pub(super) window: Vec<f32>,
    pub(super) buffer: Vec<Complex32>,
    pub(super) frame: Vec<f32>,
    pub(super) scratch: Vec<Complex32>,
    pub(super) sum: Vec<f32>,
    pub(super) weight: Vec<f32>,
    /// Absolute padded position of `sum[0]`.
    pub(super) base: usize,
}

impl OverlapAdd {
    /// Adds frame `index`, then appends the finished samples (padding removed).
    pub fn push(&mut self, index: usize, spectrum: &[Complex32], output: &mut Vec<f32>) {
        self.buffer.copy_from_slice(spectrum);
        self.buffer[0].im = 0.0;
        if let Some(last) = self.buffer.last_mut() {
            last.im = 0.0;
        }
        let _ = self
            .ifft
            .process_with_scratch(&mut self.buffer, &mut self.frame, &mut self.scratch);
        let start = index * HOP - self.base;
        self.sum.resize(self.sum.len().max(start + N_FFT), 0.0);
        self.weight.resize(self.sum.len(), 0.0);
        for (offset, window) in self.window.iter().enumerate() {
            self.sum[start + offset] += self.frame[offset] / N_FFT as f32 * window;
            self.weight[start + offset] += window * window;
        }
        self.release(start + HOP, output);
    }
}
