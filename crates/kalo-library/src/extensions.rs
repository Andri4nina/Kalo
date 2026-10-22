use std::path::Path;

/// Formats that both the metadata reader and WebView audio engine handle.
const SUPPORTED: &[&str] = &["mp3", "flac", "m4a", "aac", "ogg", "oga", "opus", "wav"];

/// Video containers the WebView can play natively.
const VIDEO: &[&str] = &["mp4", "m4v", "webm"];

fn has_extension(path: &Path, list: &[&str]) -> bool {
    let Some(extension) = path.extension().and_then(|value| value.to_str()) else {
        return false;
    };
    list.iter().any(|candidate| extension.eq_ignore_ascii_case(candidate))
}

pub fn is_supported(path: &Path) -> bool {
    has_extension(path, SUPPORTED)
}

pub fn is_video(path: &Path) -> bool {
    has_extension(path, VIDEO)
}
