use serde::{Deserialize, Serialize};

use crate::Track;

#[derive(Debug, Clone, Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct Playlist {
    pub id: i64,
    pub name: String,
    pub description: String,
    pub cover_path: Option<String>,
    pub track_count: i64,
    pub created_at: i64,
    pub updated_at: i64,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct PlaylistDetail {
    pub playlist: Playlist,
    pub tracks: Vec<Track>,
}
