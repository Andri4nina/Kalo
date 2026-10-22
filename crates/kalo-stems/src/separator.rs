//! Provider-independent separation contract: any engine that turns magnitude
//! spectrograms into the four Spleeter estimates can drive the pipeline.

use crate::StemError;

/// Estimates produced by the network, in this order.
pub const ESTIMATE_NAMES: [&str; 4] = ["vocals", "drums", "bass", "other"];

/// Files written by a separation: the four estimates plus the instrumental
/// (drums + bass + other), which is the mix without the vocals.
pub const OUTPUT_NAMES: [&str; 5] = ["vocals", "drums", "bass", "other", "instrumental"];

/// Length of one network input or output: `[2 channels, 1 split, 512 frames, 1024 bins]`.
pub const SPLIT_VALUES: usize = 2 * 512 * 1024;

pub trait Separator {
    /// Returns the magnitude estimate of each stem for one split of magnitudes.
    fn estimate(&mut self, magnitudes: &[f32]) -> Result<[Vec<f32>; 4], StemError>;
}
