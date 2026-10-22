use serde::{Deserialize, Serialize};

/// A separation job and its outcome (`running`, `done`, `failed`, `cancelled`).
#[derive(Debug, Clone, Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct StemJob {
    pub id: i64,
    pub track_id: i64,
    pub track_path: String,
    pub title: String,
    pub artist: Option<String>,
    pub status: String,
    pub error: Option<String>,
    pub output_dir: Option<String>,
    pub created_at: i64,
    pub finished_at: Option<i64>,
}

/// Progress of a running job (network splits) or of the model download (bytes).
#[derive(Debug, Clone, Copy, Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct StemProgress {
    pub job_id: Option<i64>,
    pub done: u64,
    pub total: u64,
}

/// Local separation model: what is installed and what a download would cost.
#[derive(Debug, Clone, Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct StemModelStatus {
    pub installed: bool,
    pub installed_bytes: u64,
    pub download_bytes: u64,
    pub source: String,
    pub license: String,
}
