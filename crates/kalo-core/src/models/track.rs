use serde::{Deserialize, Serialize};

/// A track indexed in the library. `path` always points at the user's file.
#[derive(Debug, Clone, Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct Track {
    pub id: i64,
    pub path: String,
    pub title: String,
    pub artist: Option<String>,
    pub album: Option<String>,
    pub genre: Option<String>,
    pub year: Option<i64>,
    pub duration_ms: i64,
    pub format: String,
    pub cover_path: Option<String>,
    pub favorite: bool,
    pub is_missing: bool,
    pub added_at: i64,
}
