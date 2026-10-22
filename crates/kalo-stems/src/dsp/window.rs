use std::f32::consts::PI;

/// Frame length of the Spleeter STFT.
pub const N_FFT: usize = 4096;
/// Hop between frames.
pub const HOP: usize = 1024;
/// Complex bins produced by a real FFT of `N_FFT` samples.
pub const BINS: usize = N_FFT / 2 + 1;
/// Bins modelled by the network (up to about 11 kHz).
pub const MODEL_BINS: usize = 1024;
/// Frames per network split.
pub const SPLIT: usize = 512;
/// Zeros prepended so the window ramp never divides float noise (see docs).
pub const PAD: usize = N_FFT - HOP;

/// Periodic Hann window: `hanning(N + 1)[:-1]`, not the symmetric one.
pub fn periodic_hann() -> Vec<f32> {
    (0..N_FFT)
        .map(|index| 0.5 - 0.5 * (2.0 * PI * index as f32 / N_FFT as f32).cos())
        .collect()
}

/// Number of STFT frames for a signal of `length` samples (padding included).
pub fn frame_count(length: usize) -> usize {
    (PAD + length).div_ceil(HOP).max(1)
}
