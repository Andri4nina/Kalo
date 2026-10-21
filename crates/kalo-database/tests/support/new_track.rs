use kalo_core::NewTrack;

pub fn new_track(path: &str, root_id: i64) -> NewTrack {
    NewTrack {
        path: path.into(),
        root_id,
        title: "Ancien titre".into(),
        artist: Some("Ancien artiste".into()),
        album: Some("Ancien album".into()),
        genre: None,
        year: None,
        track_no: None,
        disc_no: None,
        duration_ms: 1_000,
        format: "mp3".into(),
        bitrate: None,
        sample_rate: None,
        channels: None,
        size_bytes: None,
        mtime: None,
        cover_path: None,
        scan_mark: 1,
    }
}
