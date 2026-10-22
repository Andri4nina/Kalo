use std::path::Path;

use symphonia::core::errors::Error;

use super::open::{failure, open, Opened};
use crate::StemError;

/// Decoded audio as two channels (mono is duplicated) at its native rate.
pub struct Decoded {
    pub rate: u32,
    pub channels: [Vec<f32>; 2],
}

/// Decodes a whole file (read-only). Corrupt packets are skipped.
pub fn decode(path: &Path) -> Result<Decoded, StemError> {
    let Opened {
        mut format,
        mut decoder,
        track_id,
    } = open(path)?;
    let (mut rate, mut interleaved, mut channels) = (0u32, Vec::new(), [Vec::new(), Vec::new()]);
    while let Some(packet) = format.next_packet().map_err(failure)? {
        if packet.track_id != track_id {
            continue;
        }
        let buffer = match decoder.decode(&packet) {
            Ok(buffer) => buffer,
            Err(Error::DecodeError(_)) => continue,
            Err(error) => return Err(failure(error)),
        };
        rate = buffer.spec().rate();
        let count = buffer.spec().channels().count().max(1);
        interleaved.resize(buffer.samples_interleaved(), 0.0f32);
        buffer.copy_to_slice_interleaved(&mut interleaved);
        for frame in interleaved.chunks_exact(count) {
            channels[0].push(frame[0]);
            channels[1].push(frame[if count > 1 { 1 } else { 0 }]);
        }
    }
    if rate == 0 {
        return Err(failure("aucun échantillon décodé"));
    }
    Ok(Decoded { rate, channels })
}
