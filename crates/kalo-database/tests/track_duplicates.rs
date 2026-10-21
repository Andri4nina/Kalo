use kalo_core::NewTrack;
use kalo_database::{roots, tracks, Database};

fn new_track(path: &str, root_id: i64, title: &str, duration_ms: i64) -> NewTrack {
    NewTrack {
        path: path.into(),
        root_id,
        title: title.into(),
        artist: Some("Artiste".into()),
        album: None,
        genre: None,
        year: None,
        track_no: None,
        disc_no: None,
        duration_ms,
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

#[test]
fn groups_tracks_with_same_title_artist_and_duration() {
    let db = Database::in_memory().unwrap_or_else(|error| panic!("base : {error}"));
    let root = db.with(|conn| roots::add(conn, "C:/musique")).unwrap_or_else(|error| panic!("racine : {error}"));
    for (path, title, duration) in [
        ("C:/musique/a.mp3", "Titre", 180_000),
        ("C:/musique/b.mp3", "Titre", 180_500),
        ("C:/musique/c.mp3", "Autre", 180_000),
    ] {
        db.with(|conn| tracks::upsert(conn, &new_track(path, root.id, title, duration)))
            .unwrap_or_else(|error| panic!("morceau : {error}"));
    }
    let groups = db.with(|conn| tracks::duplicates(conn)).unwrap_or_else(|error| panic!("doublons : {error}"));
    assert_eq!(groups.len(), 1);
    assert_eq!(groups[0].tracks.len(), 2);
    assert_eq!(groups[0].title, "Titre");
}