use serde::{Deserialize, Serialize};

/// Aggregated artist row shown in the Artists section.
#[derive(Debug, Clone, Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct ArtistSummary {
    pub id: i64,
    pub name: String,
    pub track_count: i64,
    pub album_count: i64,
}

/// Aggregated album row shown in the Albums section.
#[derive(Debug, Clone, Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct AlbumSummary {
    pub id: i64,
    pub title: String,
    pub artist: Option<String>,
    pub year: Option<i64>,
    pub track_count: i64,
    pub cover_path: Option<String>,
}
