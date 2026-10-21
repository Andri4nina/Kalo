use serde::{Deserialize, Serialize};

use crate::Track;

/// Tracks sharing the same normalized title, artist and duration.
#[derive(Debug, Clone, Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct DuplicateGroup {
    pub key: String,
    pub title: String,
    pub artist: Option<String>,
    pub tracks: Vec<Track>,
}