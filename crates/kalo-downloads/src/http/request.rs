use std::io::Read;

use super::MAX_BYTES;
use crate::DownloadError;

/// An answered request: the body to read and where the file resumes.
pub struct Opened {
    pub reader: Box<dyn Read + Send>,
    /// Bytes already on disk that the server agreed to skip.
    pub have: u64,
    /// True when the server honoured the `Range` request (status 206).
    pub partial: bool,
    pub total: Option<u64>,
}

/// Sends the request, asking for the missing bytes only when `have > 0`.
pub fn open(url: &str, have: u64) -> Result<Opened, DownloadError> {
    let mut request = ureq::get(url);
    if have > 0 {
        request = request.header("Range", format!("bytes={have}-"));
    }
    let response = request
        .call()
        .map_err(|error| DownloadError::Network(error.to_string()))?;
    let partial = response.status().as_u16() == 206;
    let have = if partial { have } else { 0 };
    let length = response
        .headers()
        .get("content-length")
        .and_then(|value| value.to_str().ok()?.parse::<u64>().ok());
    let total = length.map(|value| value + have);
    if total.is_some_and(|value| value > MAX_BYTES) {
        return Err(DownloadError::Rejected("fichier trop volumineux (2 Go maximum)".into()));
    }
    Ok(Opened {
        reader: Box::new(response.into_body().into_reader()),
        have,
        partial,
        total,
    })
}
