use serde::{Deserialize, Serialize};

/// A work found on a source that allows downloading it (with its licence).
#[derive(Debug, Clone, Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct RemoteItem {
    pub provider: String,
    pub id: String,
    pub title: String,
    pub creator: Option<String>,
    pub license: String,
}

/// A downloadable audio file of a remote item.
#[derive(Debug, Clone, Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct RemoteFile {
    pub name: String,
    pub url: String,
    pub size: Option<u64>,
    pub md5: Option<String>,
    pub format: String,
}

/// A download, its state (`queued`, `running`, `paused`, `done`, `failed`,
/// `cancelled`) and where it ended up in the library.
#[derive(Debug, Clone, Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct DownloadEntry {
    pub id: i64,
    pub url: String,
    pub file_name: String,
    pub provider: String,
    pub license: Option<String>,
    pub root_id: i64,
    pub status: String,
    pub received: i64,
    pub total: Option<i64>,
    pub error: Option<String>,
    pub created_at: i64,
}

#[derive(Debug, Clone, Copy, Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct DownloadProgress {
    pub id: i64,
    pub received: u64,
    pub total: Option<u64>,
    pub bytes_per_second: u64,
}
