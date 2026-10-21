use kalo_core::NewTrack;
use kalo_database::{roots, tracks, Database};

fn new_track(path: &str, root_id: i64) -> NewTrack {
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

#[test]
fn metadata_update_rewrites_artist_album_and_year() {
    let db = Database::in_memory().unwrap_or_else(|error| panic!("base : {error}"));
    let root = db
        .with(|conn| roots::add(conn, "C:/musique"))
        .unwrap_or_else(|error| panic!("racine : {error}"));
    let id = db
        .with(|conn| tracks::upsert(conn, &new_track("C:/musique/a.mp3", root.id)))
        .unwrap_or_else(|error| panic!("morceau : {error}"))
        .0;
    let changed = db
        .with(|conn| tracks::update(conn, id, "Nouveau titre", "Nouvel artiste", Some("Nouvel album"), Some("Rock"), Some(2024)))
        .unwrap_or_else(|error| panic!("mise à jour : {error}"));
    assert!(changed);
    let track = db
        .with(|conn| {
            Ok(conn.query_row(
                "SELECT title, artist_id, album_id, genre, year FROM tracks WHERE id = ?1",
                [id],
                |row| Ok((row.get::<_, String>(0)?, row.get::<_, i64>(1)?, row.get::<_, Option<i64>>(2)?, row.get::<_, Option<String>>(3)?, row.get::<_, Option<i64>>(4)?)),
            )?)
        })
        .unwrap_or_else(|error| panic!("lecture : {error}"));
    assert_eq!(track.0, "Nouveau titre");
    assert_eq!(track.3.as_deref(), Some("Rock"));
    assert_eq!(track.4, Some(2024));
}

#[test]
fn metadata_update_reports_unknown_track() {
    let db = Database::in_memory().unwrap_or_else(|error| panic!("base : {error}"));
    let changed = db
        .with(|conn| tracks::update(conn, 999, "Titre", "Artiste", None, None, None))
        .unwrap_or_else(|error| panic!("mise à jour : {error}"));
    assert!(!changed);
}

#[test]
fn relocate_moves_a_missing_track_into_another_root() {
    let db = Database::in_memory().unwrap_or_else(|error| panic!("base : {error}"));
    let first = db.with(|conn| roots::add(conn, "C:/musique")).unwrap_or_else(|error| panic!("racine : {error}"));
    let second = db.with(|conn| roots::add(conn, "D:/archives")).unwrap_or_else(|error| panic!("racine : {error}"));
    let id = db
        .with(|conn| tracks::upsert(conn, &new_track("C:/musique/a.mp3", first.id)))
        .unwrap_or_else(|error| panic!("morceau : {error}"))
        .0;
    let changed = db
        .with(|conn| tracks::relocate(conn, id, "D:/archives/a.mp3", second.id))
        .unwrap_or_else(|error| panic!("relocalisation : {error}"));
    assert!(changed);
    let (path, root, missing) = db
        .with(|conn| {
            Ok(conn.query_row("SELECT path, root_id, is_missing FROM tracks WHERE id = ?1", [id], |row| {
                Ok((row.get::<_, String>(0)?, row.get::<_, i64>(1)?, row.get::<_, i64>(2)?))
            })?)
        })
        .unwrap_or_else(|error| panic!("lecture : {error}"));
    assert_eq!(path, "D:/archives/a.mp3");
    assert_eq!(root, second.id);
    assert_eq!(missing, 0);
}

#[test]
fn relocate_rejects_a_path_already_indexed() {
    let db = Database::in_memory().unwrap_or_else(|error| panic!("base : {error}"));
    let root = db.with(|conn| roots::add(conn, "C:/musique")).unwrap_or_else(|error| panic!("racine : {error}"));
    let first = db.with(|conn| tracks::upsert(conn, &new_track("C:/musique/a.mp3", root.id))).unwrap_or_else(|error| panic!("morceau : {error}")).0;
    db.with(|conn| tracks::upsert(conn, &new_track("C:/musique/b.mp3", root.id))).unwrap_or_else(|error| panic!("morceau : {error}"));
    let result = db.with(|conn| tracks::relocate(conn, first, "C:/musique/b.mp3", root.id));
    assert!(result.is_err());
}