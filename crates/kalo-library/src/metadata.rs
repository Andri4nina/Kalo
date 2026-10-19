use std::path::Path;

use lofty::prelude::*;
use lofty::tag::Accessor;

use crate::cover;

mod types;

pub use types::Metadata;

pub fn read(path: &Path, cache_dir: &Path) -> Result<Metadata, String> {
    let file = lofty::read_from_path(path).map_err(|error| error.to_string())?;
    let properties = file.properties();
    let tag = file.primary_tag().or_else(|| file.first_tag());
    let cover_path = tag
        .and_then(|value| value.pictures().first())
        .and_then(|picture| cover::store(cache_dir, picture.data(), picture.mime_type()))
        .or_else(|| cover::folder(path, cache_dir));
    Ok(Metadata {
        title: types::text(tag.and_then(Accessor::title)),
        artist: types::text(tag.and_then(Accessor::artist)),
        album: types::text(tag.and_then(Accessor::album)),
        genre: types::text(tag.and_then(Accessor::genre)),
        year: tag.and_then(Accessor::date).map(|date| i64::from(date.year)),
        track_no: tag.and_then(Accessor::track).map(i64::from),
        disc_no: tag.and_then(Accessor::disk).map(i64::from),
        duration_ms: properties.duration().as_millis() as i64,
        bitrate: properties.audio_bitrate().map(i64::from),
        sample_rate: properties.sample_rate().map(i64::from),
        channels: properties.channels().map(i64::from),
        cover_path,
    })
}
