use serde::{Deserialize, Serialize};

/// A local video clip. `path` always points at the user's file.
#[derive(Debug, Clone, Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct Video {
    pub id: i64,
    pub path: String,
    pub title: String,
    pub artist: Option<String>,
    pub duration_ms: i64,
    pub format: String,
    pub is_missing: bool,
    pub added_at: i64,
}

/// A video seen during a scan, before it is stored.
#[derive(Debug, Clone)]
pub struct NewVideo {
    pub path: String,
    pub root_id: i64,
    pub title: String,
    pub artist: Option<String>,
    pub duration_ms: i64,
    pub format: String,
    pub scan_mark: i64,
}
