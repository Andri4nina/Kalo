use serde::{Deserialize, Serialize};

#[derive(Debug, Clone, Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct LibraryRoot {
    pub id: i64,
    pub path: String,
    pub added_at: i64,
    pub last_scan_at: Option<i64>,
}

#[derive(Debug, Clone, Copy, Default, Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct LibraryStats {
    pub tracks: i64,
    pub albums: i64,
    pub artists: i64,
    pub favorites: i64,
    pub playlists: i64,
    pub total_duration_ms: i64,
    pub missing: i64,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct ScanProgress {
    pub scanned: i64,
    pub imported: i64,
    pub errors: i64,
    pub current: String,
}

#[derive(Debug, Clone, Default, Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct ImportSummary {
    pub added: i64,
    pub skipped: i64,
}

#[derive(Debug, Clone, Default, Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct ScanSummary {
    pub files_found: i64,
    pub imported: i64,
    pub updated: i64,
    pub errors: i64,
    pub missing: i64,
    pub duration_ms: i64,
}
