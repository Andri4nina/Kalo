use kalo_database::{roots, tracks, Database};

mod support;

use support::insert;

#[test]
fn cover_update_stores_the_cache_path() {
    let db = Database::in_memory().unwrap_or_else(|error| panic!("base : {error}"));
    let root = db
        .with(|conn| roots::add(conn, "C:/musique"))
        .unwrap_or_else(|error| panic!("racine : {error}"));
    let id = insert(&db, root.id, "C:/musique/a.mp3");
    let changed = db
        .with(|conn| tracks::set_cover(conn, id, "C:/cache/covers/abc.png"))
        .unwrap_or_else(|error| panic!("pochette : {error}"));
    assert!(changed);
    let path = db
        .with(|conn| {
            Ok(
                conn.query_row("SELECT cover_path FROM tracks WHERE id = ?1", [id], |row| {
                    row.get::<_, String>(0)
                })?,
            )
        })
        .unwrap_or_else(|error| panic!("lecture : {error}"));
    assert_eq!(path, "C:/cache/covers/abc.png");
}

#[test]
fn cover_update_reports_unknown_track() {
    let db = Database::in_memory().unwrap_or_else(|error| panic!("base : {error}"));
    let changed = db
        .with(|conn| tracks::set_cover(conn, 999, "C:/cache/covers/abc.png"))
        .unwrap_or_else(|error| panic!("pochette : {error}"));
    assert!(!changed);
}
