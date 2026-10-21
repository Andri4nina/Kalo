use kalo_database::{roots, tracks, Database};

mod support;

use support::{metadata_row, new_track};

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
        .with(|conn| {
            tracks::update(
                conn,
                id,
                "Nouveau titre",
                "Nouvel artiste",
                Some("Nouvel album"),
                Some("Rock"),
                Some(2024),
            )
        })
        .unwrap_or_else(|error| panic!("mise à jour : {error}"));
    assert!(changed);
    let track = metadata_row(&db, id);
    assert_eq!(track.0, "Nouveau titre");
    assert_eq!(track.3.as_deref(), Some("Rock"));
    assert_eq!(track.4, Some(2024));
}
