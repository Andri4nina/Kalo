use std::path::Path;

use kalo_core::NewVideo;
use lofty::prelude::*;

use crate::paths;

/// MP4 tags give title, artist and duration; other containers fall back to the file name.
pub fn describe(path: &Path, root_id: i64, mark: i64) -> NewVideo {
    let file = lofty::read_from_path(path).ok();
    let tag = file
        .as_ref()
        .and_then(|value| value.primary_tag().or_else(|| value.first_tag()));
    let text = |value: Option<std::borrow::Cow<'_, str>>| {
        value.map(|text| text.trim().to_owned()).filter(|text| !text.is_empty())
    };
    NewVideo {
        path: paths::display(path),
        root_id,
        title: text(tag.and_then(Accessor::title)).unwrap_or_else(|| paths::fallback_title(path)),
        artist: text(tag.and_then(Accessor::artist)),
        duration_ms: file
            .map(|value| value.properties().duration().as_millis() as i64)
            .unwrap_or(0),
        format: paths::format_name(path),
        scan_mark: mark,
    }
}
