use std::path::Path;
use std::time::UNIX_EPOCH;

use kalo_core::NewTrack;

use crate::{metadata::Metadata, paths};

pub fn build(path: &Path, root_id: i64, mark: i64, metadata: Metadata) -> NewTrack {
    let info = std::fs::metadata(path).ok();
    let size_bytes = info.as_ref().map(|value| value.len() as i64);
    let mtime = info
        .and_then(|value| value.modified().ok())
        .and_then(|value| value.duration_since(UNIX_EPOCH).ok())
        .map(|value| value.as_secs() as i64);
    let Metadata {
        title,
        artist,
        album,
        genre,
        year,
        track_no,
        disc_no,
        duration_ms,
        bitrate,
        sample_rate,
        channels,
        cover_path,
    } = metadata;
    NewTrack {
        path: paths::display(path),
        root_id,
        title: title.unwrap_or_else(|| paths::fallback_title(path)),
        artist,
        album,
        genre,
        year,
        track_no,
        disc_no,
        duration_ms,
        format: paths::format_name(path),
        bitrate,
        sample_rate,
        channels,
        size_bytes,
        mtime,
        cover_path,
        scan_mark: mark,
    }
}
