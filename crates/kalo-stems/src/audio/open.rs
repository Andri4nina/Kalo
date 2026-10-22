use std::fs::File;
use std::path::Path;

use symphonia::core::codecs::audio::{AudioDecoder, AudioDecoderOptions};
use symphonia::core::formats::probe::Hint;
use symphonia::core::formats::{FormatOptions, FormatReader, TrackType};
use symphonia::core::io::MediaSourceStream;
use symphonia::core::meta::MetadataOptions;

use crate::StemError;

/// Container reader and decoder of the first audio track of a file.
pub struct Opened {
    pub format: Box<dyn FormatReader>,
    pub decoder: Box<dyn AudioDecoder>,
    pub track_id: u32,
}

pub fn failure(error: impl std::fmt::Display) -> StemError {
    StemError::Decode(error.to_string())
}

pub fn open(path: &Path) -> Result<Opened, StemError> {
    let stream = MediaSourceStream::new(Box::new(File::open(path)?), Default::default());
    let mut hint = Hint::new();
    if let Some(extension) = path.extension().and_then(|value| value.to_str()) {
        hint.with_extension(extension);
    }
    let format = symphonia::default::get_probe()
        .probe(&hint, stream, FormatOptions::default(), MetadataOptions::default())
        .map_err(failure)?;
    let track = format
        .default_track(TrackType::Audio)
        .ok_or_else(|| failure("aucune piste audio"))?;
    let params = track
        .codec_params
        .as_ref()
        .and_then(|params| params.audio())
        .ok_or_else(|| failure("codec inconnu"))?;
    let decoder = symphonia::default::get_codecs()
        .make_audio_decoder(params, &AudioDecoderOptions::default())
        .map_err(failure)?;
    let track_id = track.id;
    Ok(Opened {
        format,
        decoder,
        track_id,
    })
}
