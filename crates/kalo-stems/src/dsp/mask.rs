use super::window::{BINS, MODEL_BINS};

/// Number of network estimates (vocals, drums, bass, other).
pub const ESTIMATES: usize = 4;

/// Spleeter soft ratio masks for one frame of one channel, extended from the
/// 1024 modelled bins to all 2049 with the per-frame mean ("average"), so the
/// masks of the four estimates always sum to one.
pub fn frame_masks(estimates: [&[f32]; ESTIMATES], masks: &mut [Vec<f32>; ESTIMATES]) {
    for mask in masks.iter_mut() {
        mask.resize(BINS, 0.0);
    }
    for bin in 0..MODEL_BINS {
        let total: f32 = estimates
            .iter()
            .map(|estimate| estimate[bin] * estimate[bin])
            .sum::<f32>()
            + 1e-10;
        for (stem, estimate) in estimates.iter().enumerate() {
            masks[stem][bin] = (estimate[bin] * estimate[bin] + 1e-10 / ESTIMATES as f32) / total;
        }
    }
    for mask in masks.iter_mut() {
        let mean = mask[..MODEL_BINS].iter().sum::<f32>() / MODEL_BINS as f32;
        mask[MODEL_BINS..].fill(mean);
    }
}
