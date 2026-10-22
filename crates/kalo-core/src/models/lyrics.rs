use serde::{Deserialize, Serialize};

/// Where the displayed lyrics come from.
#[derive(Debug, Clone, Copy, PartialEq, Eq, Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
pub enum LyricsOrigin {
    /// Edited or synchronised in Kalo (stored in the database).
    Edited,
    /// `.lrc` file next to the audio.
    LrcFile,
    /// `.txt` file next to the audio (unsynchronised).
    TextFile,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct LyricsSource {
    pub content: String,
    pub origin: LyricsOrigin,
}
