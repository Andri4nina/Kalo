use serde::{Deserialize, Serialize};

use crate::Track;

#[derive(Debug, Clone, Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct TrackQuery {
    pub search: Option<String>,
    pub sort: String,
    pub favorites_only: bool,
    pub playlist_id: Option<i64>,
    pub limit: i64,
    pub offset: i64,
}

impl TrackQuery {
    pub fn bounded_limit(&self) -> i64 {
        self.limit.clamp(1, 500)
    }

    pub fn bounded_offset(&self) -> i64 {
        self.offset.max(0)
    }
}

#[derive(Debug, Clone, Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct TrackPage {
    pub items: Vec<Track>,
    pub total: i64,
}
