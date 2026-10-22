use crate::dsp::{frame_masks, BINS, MODEL_BINS, SPLIT};

use super::workspace::Workspace;

/// Applies the masks of one frame to the original complex spectrum (original
/// phase kept) and feeds the five outputs; the instrumental mask is the sum of
/// the drums, bass and other masks.
pub fn frame(channel: usize, first: usize, frame: usize, estimates: &[Vec<f32>; 4], work: &mut Workspace) {
    let offset = (channel * SPLIT + frame) * MODEL_BINS;
    let slices = estimates
        .each_ref()
        .map(|estimate| &estimate[offset..offset + MODEL_BINS]);
    frame_masks(slices, &mut work.masks);
    let spectrum_at = (channel * SPLIT + frame) * BINS;
    for output in 0..5 {
        for bin in 0..BINS {
            let mask = if output < 4 {
                work.masks[output][bin]
            } else {
                work.masks[1][bin] + work.masks[2][bin] + work.masks[3][bin]
            };
            work.scaled[bin] = work.spectra[spectrum_at + bin] * mask;
        }
        let Workspace {
            ola, outputs, scaled, ..
        } = work;
        ola[output][channel].push(first + frame, scaled, &mut outputs[output][channel]);
    }
}
