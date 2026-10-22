const FORBIDDEN: &str = "<>:\"/\\|?*";
const MAX_CHARS: usize = 100;
const RESERVED: &[&str] = &[
    "CON", "PRN", "AUX", "NUL", "COM1", "COM2", "COM3", "COM4", "COM5", "COM6", "COM7", "COM8", "COM9", "LPT1", "LPT2",
    "LPT3", "LPT4", "LPT5", "LPT6", "LPT7", "LPT8", "LPT9",
];

fn trim_tail(value: &str) -> &str {
    value.trim().trim_end_matches(['.', ' '])
}

/// Turns tag text into a folder or file name valid on Windows, macOS and Linux.
pub fn component(value: &str, fallback: &str) -> String {
    let cleaned: String = value
        .chars()
        .map(|c| {
            if c.is_control() || FORBIDDEN.contains(c) {
                '_'
            } else {
                c
            }
        })
        .collect();
    let limited: String = trim_tail(&cleaned).chars().take(MAX_CHARS).collect();
    let mut name = trim_tail(&limited).to_owned();
    if name.is_empty() || name.chars().all(|c| c == '_') {
        name = fallback.to_owned();
    }
    let stem = name.split('.').next().unwrap_or_default().to_ascii_uppercase();
    if RESERVED.contains(&stem.as_str()) {
        name.push('_');
    }
    name
}
