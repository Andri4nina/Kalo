use serde::Deserialize;

/// What the interface asks to download (a direct link or an archive file).
#[derive(Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct DownloadRequest {
    pub url: String,
    pub root_id: i64,
    pub provider: String,
    pub file_name: Option<String>,
    pub license: Option<String>,
    pub md5: Option<String>,
}
