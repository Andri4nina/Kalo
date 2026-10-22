use crate::DownloadError;

mod percent;

pub use percent::encode;
use percent::percent_decode;

const MAX_URL: usize = 2_048;

/// Only plain `http(s)` addresses to a named host are accepted: no local
/// files, no credentials embedded in the address.
pub fn validate(url: &str) -> Result<(), DownloadError> {
    let url = url.trim();
    let rest = url
        .strip_prefix("https://")
        .or_else(|| url.strip_prefix("http://"))
        .ok_or_else(|| DownloadError::Url("seuls les liens http et https sont acceptés".into()))?;
    let host = rest.split(['/', '?', '#']).next().unwrap_or_default();
    if url.len() > MAX_URL || host.is_empty() || host.contains('@') || url.chars().any(char::is_whitespace) {
        return Err(DownloadError::Url("lien invalide".into()));
    }
    Ok(())
}

/// Last path segment, percent-decoded for display (`Ma%20chanson.mp3`).
pub fn file_name(url: &str) -> String {
    let path = url.split(['?', '#']).next().unwrap_or_default();
    let last = path.rsplit('/').next().unwrap_or_default();
    let decoded = percent_decode(last);
    if decoded.trim().is_empty() {
        "telechargement".to_owned()
    } else {
        decoded
    }
}
