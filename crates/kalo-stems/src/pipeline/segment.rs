use crate::dsp::{BINS, MODEL_BINS, SPLIT};
use crate::separator::Separator;
use crate::StemError;

use super::workspace::Workspace;

/// Processes `count` frames starting at `first`: STFT, network, masks, then
/// overlap-add of each output into the workspace.
pub fn process(
    channels: [&[f32]; 2],
    first: usize,
    count: usize,
    separator: &mut dyn Separator,
    work: &mut Workspace,
) -> Result<(), StemError> {
    work.magnitudes.fill(0.0);
    for (channel, signal) in channels.iter().enumerate() {
        for frame in 0..count {
            let at = (channel * SPLIT + frame) * BINS;
            work.stft.frame(signal, first + frame, &mut work.spectra[at..at + BINS]);
            let mags = &mut work.magnitudes[(channel * SPLIT + frame) * MODEL_BINS..][..MODEL_BINS];
            for (bin, value) in mags.iter_mut().enumerate() {
                *value = work.spectra[at + bin].norm();
            }
        }
    }
    let estimates = separator.estimate(&work.magnitudes)?;
    for channel in 0..2 {
        for frame in 0..count {
            super::reconstruct::frame(channel, first, frame, &estimates, work);
        }
    }
    Ok(())
}
