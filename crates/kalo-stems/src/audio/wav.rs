use std::fs::File;
use std::io::{BufWriter, Seek, SeekFrom, Write};
use std::path::Path;

mod header;

use header::header;

/// Streaming 16-bit stereo PCM WAV writer; sizes are patched on `finish`.
pub struct WavWriter {
    file: BufWriter<File>,
    frames: u32,
}

impl WavWriter {
    pub fn create(path: &Path) -> std::io::Result<Self> {
        let mut file = BufWriter::new(File::create(path)?);
        file.write_all(&header(super::resample::MODEL_RATE, 0))?;
        Ok(Self { file, frames: 0 })
    }

    pub fn write(&mut self, left: &[f32], right: &[f32]) -> std::io::Result<()> {
        let quantize = |value: f32| ((value.clamp(-1.0, 1.0) * 32_767.0).round() as i16).to_le_bytes();
        for (l, r) in left.iter().zip(right) {
            self.file.write_all(&quantize(*l))?;
            self.file.write_all(&quantize(*r))?;
        }
        self.frames = self.frames.saturating_add(left.len().min(right.len()) as u32);
        Ok(())
    }

    pub fn finish(mut self) -> std::io::Result<()> {
        self.file.seek(SeekFrom::Start(0))?;
        self.file.write_all(&header(super::resample::MODEL_RATE, self.frames))?;
        self.file.flush()
    }
}
