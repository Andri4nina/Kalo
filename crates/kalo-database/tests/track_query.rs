use kalo_core::TrackQuery;
use kalo_database::{roots, tracks, Database};

mod support;

fn query() -> TrackQuery {
    TrackQuery {
        search: None,
        sort: "title".into(),
        favorites_only: false,
        playlist_id: None,
        limit: 100,
        offset: 0,
        format: None,
        availability: None,
        min_duration_ms: None,
        max_duration_ms: None,
    }
}

fn database() -> (Database, i64) {
    let db = Database::in_memory().unwrap_or_else(|error| panic!("base : {error}"));
    let root = db.with(|conn| roots::add(conn, "C:/musique")).unwrap_or_else(|error| panic!("racine : {error}"));
    support::insert(&db, root.id, "C:/musique/a.mp3");
    support::insert(&db, root.id, "C:/musique/b.flac");
    db.with(|conn| Ok(conn.execute("UPDATE tracks SET format = 'FLAC' WHERE path LIKE '%.flac'", [])?))
        .unwrap_or_else(|error| panic!("format : {error}"));
    (db, root.id)
}

#[test]
fn filters_by_format_and_duration() {
    let (db, _) = database();
    let mut format = query();
    format.format = Some("MP3".into());
    let items = db.with(|conn| tracks::list(conn, &format)).unwrap_or_else(|error| panic!("liste : {error}"));
    assert_eq!(items.len(), 1);
    let mut long = query();
    long.min_duration_ms = Some(2_000);
    let items = db.with(|conn| tracks::list(conn, &long)).unwrap_or_else(|error| panic!("liste : {error}"));
    assert!(items.is_empty());
}

#[test]
fn filters_by_availability() {
    let (db, _) = database();
    db.with(|conn| Ok(conn.execute("UPDATE tracks SET is_missing = 1 WHERE path LIKE '%.mp3'", [])?))
        .unwrap_or_else(|error| panic!("marquage : {error}"));
    let mut missing = query();
    missing.availability = Some("missing".into());
    let items = db.with(|conn| tracks::list(conn, &missing)).unwrap_or_else(|error| panic!("liste : {error}"));
    assert_eq!(items.len(), 1);
    assert!(items[0].is_missing);
}

#[test]
fn search_treats_wildcards_literally() {
    let (db, _) = database();
    let mut search = query();
    search.search = Some("%".into());
    let items = db.with(|conn| tracks::list(conn, &search)).unwrap_or_else(|error| panic!("liste : {error}"));
    assert!(items.is_empty());
}