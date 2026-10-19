use std::path::Path;

/// Formats that both the metadata reader and WebView audio engine handle.
const SUPPORTED: &[&str] = &["mp3", "flac", "m4a", "aac", "ogg", "oga", "opus", "wav"];

pub fn is_supported(path: &Path) -> bool {
    let Some(extension) = path.extension().and_then(|value| value.to_str()) else {
        return false;
    };
    SUPPORTED
        .iter()
        .any(|candidate| extension.eq_ignore_ascii_case(candidate))
}
