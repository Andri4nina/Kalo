/// Metadata produced by the scanner before it is persisted.
#[derive(Debug, Clone)]
pub struct NewTrack {
    pub path: String,
    pub root_id: i64,
    pub title: String,
    pub artist: Option<String>,
    pub album: Option<String>,
    pub genre: Option<String>,
    pub year: Option<i64>,
    pub track_no: Option<i64>,
    pub disc_no: Option<i64>,
    pub duration_ms: i64,
    pub format: String,
    pub bitrate: Option<i64>,
    pub sample_rate: Option<i64>,
    pub channels: Option<i64>,
    pub size_bytes: Option<i64>,
    pub mtime: Option<i64>,
    pub cover_path: Option<String>,
    pub scan_mark: i64,
}
