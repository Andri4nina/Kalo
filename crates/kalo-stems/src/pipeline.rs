use std::sync::atomic::{AtomicBool, Ordering};

use crate::dsp::{frame_count, SPLIT};
use crate::separator::Separator;
use crate::StemError;

mod reconstruct;
mod segment;
mod sink;
mod workspace;

pub use sink::StemSink;

use workspace::Workspace;

/// Separates a 44.1 kHz stereo signal split by split (bounded memory). Each
/// finished block of samples goes to `sink`; progress is `(done, total)` splits.
pub fn separate(
    channels: [&[f32]; 2],
    separator: &mut dyn Separator,
    sink: &mut dyn StemSink,
    cancel: &AtomicBool,
    progress: &dyn Fn(usize, usize),
) -> Result<(), StemError> {
    let length = channels[0].len().min(channels[1].len());
    let frames = frame_count(length);
    let splits = frames.div_ceil(SPLIT);
    let mut work = Workspace::new();
    let mut written = [0usize; 5];
    for split in 0..splits {
        if cancel.load(Ordering::Relaxed) {
            return Err(StemError::Cancelled);
        }
        let first = split * SPLIT;
        segment::process(channels, first, SPLIT.min(frames - first), separator, &mut work)?;
        sink::flush(sink, &mut work.outputs, &mut written, length)?;
        progress(split + 1, splits);
    }
    work.finish();
    sink::flush(sink, &mut work.outputs, &mut written, length)
}
