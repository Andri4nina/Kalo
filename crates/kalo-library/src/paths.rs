use std::path::Path;

pub fn display(path: &Path) -> String {
    dunce::simplified(path).to_string_lossy().into_owned()
}

pub fn fallback_title(path: &Path) -> String {
    path.file_stem()
        .map(|value| value.to_string_lossy().trim().to_owned())
        .filter(|value| !value.is_empty())
        .unwrap_or_else(|| "Sans titre".to_owned())
}

pub fn format_name(path: &Path) -> String {
    path.extension()
        .and_then(|value| value.to_str())
        .map(|value| value.to_ascii_uppercase())
        .unwrap_or_else(|| "Audio".to_owned())
}
