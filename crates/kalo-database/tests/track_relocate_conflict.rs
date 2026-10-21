use kalo_database::{roots, tracks, Database};

mod support;

use support::new_track;

#[test]
fn relocate_rejects_a_path_already_indexed() {
    let db = Database::in_memory().unwrap_or_else(|error| panic!("base : {error}"));
    let root = db
        .with(|conn| roots::add(conn, "C:/musique"))
        .unwrap_or_else(|error| panic!("racine : {error}"));
    let first = db
        .with(|conn| tracks::upsert(conn, &new_track("C:/musique/a.mp3", root.id)))
        .unwrap_or_else(|error| panic!("morceau : {error}"))
        .0;
    db.with(|conn| tracks::upsert(conn, &new_track("C:/musique/b.mp3", root.id)))
        .unwrap_or_else(|error| panic!("morceau : {error}"));
    let result = db.with(|conn| tracks::relocate(conn, first, "C:/musique/b.mp3", root.id));
    assert!(result.is_err());
}
