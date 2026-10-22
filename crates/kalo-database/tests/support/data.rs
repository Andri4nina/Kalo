use kalo_core::{NewTrack, TrackQuery};
use kalo_database::{tracks, Database};

pub fn insert(db: &Database, root_id: i64, path: &str) -> i64 {
    insert_with(db, root_id, path, "Artiste test", "Album test")
}

pub fn insert_with(db: &Database, root_id: i64, path: &str, artist: &str, album: &str) -> i64 {
    let track = NewTrack {
        path: path.to_owned(),
        root_id,
        title: path.to_owned(),
        artist: Some(artist.to_owned()),
        album: Some(album.to_owned()),
        genre: None,
        year: Some(2026),
        track_no: Some(1),
        disc_no: None,
        duration_ms: 1_000,
        format: "MP3".to_owned(),
        bitrate: None,
        sample_rate: None,
        channels: None,
        size_bytes: None,
        mtime: None,
        cover_path: None,
        scan_mark: 0,
    };
    db.with(|conn| tracks::upsert(conn, &track))
        .map(|(id, _)| id)
        .unwrap_or_else(|error| panic!("morceau de test : {error}"))
}

pub fn count_tracks(db: &Database) -> i64 {
    let query = TrackQuery {
        search: None,
        sort: "added".to_owned(),
        favorites_only: false,
        playlist_id: None,
        limit: 500,
        offset: 0,
        format: None,
        availability: None,
        min_duration_ms: None,
        max_duration_ms: None,
        kind: None,
    };
    db.with(|conn| tracks::count(conn, &query))
        .unwrap_or_else(|error| panic!("comptage : {error}"))
}
