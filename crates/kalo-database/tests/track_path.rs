use kalo_core::NewTrack;
use kalo_database::{roots, tracks, Database};

#[test]
fn track_path_is_read_by_id_and_missing_ids_return_none() {
    let db = Database::in_memory().unwrap_or_else(|error| panic!("base : {error}"));
    let root = db
        .with(|conn| roots::add(conn, "C:/musique"))
        .unwrap_or_else(|error| panic!("racine : {error}"));
    let track = NewTrack {
        path: "C:/musique/titre.wav".into(),
        root_id: root.id,
        title: "Titre".into(),
        artist: None,
        album: None,
        genre: None,
        year: None,
        track_no: None,
        disc_no: None,
        duration_ms: 1_000,
        format: "wav".into(),
        bitrate: None,
        sample_rate: None,
        channels: None,
        size_bytes: None,
        mtime: None,
        cover_path: None,
        scan_mark: 1,
    };
    let id = db
        .with(|conn| tracks::upsert(conn, &track))
        .unwrap_or_else(|error| panic!("morceau : {error}"))
        .0;
    let path = db
        .with(|conn| tracks::find_path(conn, id))
        .unwrap_or_else(|error| panic!("chemin : {error}"));
    assert_eq!(path.as_deref(), Some("C:/musique/titre.wav"));
    let missing = db
        .with(|conn| tracks::find_path(conn, id + 1))
        .unwrap_or_else(|error| panic!("absent : {error}"));
    assert_eq!(missing, None);
}
