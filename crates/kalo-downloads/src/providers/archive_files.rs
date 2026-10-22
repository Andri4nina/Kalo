use kalo_core::RemoteFile;
use serde_json::Value;

use super::archive_parse::text;
use crate::url::encode;

const AUDIO: &[&str] = &["mp3", "flac", "ogg", "m4a", "wav", "opus"];

/// Audio files of an item (original uploads and derivatives) with their MD5.
pub fn parse_files(item: &str, json: &Value) -> Vec<RemoteFile> {
    let files = json["files"].as_array().cloned().unwrap_or_default();
    files
        .iter()
        .filter_map(|file| {
            let name = text(&file["name"])?;
            let extension = name.rsplit('.').next()?.to_ascii_lowercase();
            AUDIO.contains(&extension.as_str()).then(|| RemoteFile {
                url: format!(
                    "https://archive.org/download/{}/{}",
                    encode(item),
                    name.split('/').map(encode).collect::<Vec<_>>().join("/")
                ),
                size: text(&file["size"]).and_then(|size| size.parse().ok()),
                md5: text(&file["md5"]),
                format: text(&file["format"]).unwrap_or(extension),
                name,
            })
        })
        .collect()
}
