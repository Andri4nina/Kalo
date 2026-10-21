use kalo_database::{roots, tracks, Database};
use rusqlite::params;

mod support;

use support::insert;

#[test]
fn remove_deletes_reference_and_dependent_rows() {
    let db = Database::in_memory().unwrap_or_else(|error| panic!("base : {error}"));
    let root = db
        .with(|conn| roots::add(conn, "C:/musique"))
        .unwrap_or_else(|error| panic!("racine : {error}"));
    let id = insert(&db, root.id, "C:/musique/a.mp3");
    db.with(|conn| {
        conn.execute("INSERT INTO playlists (name) VALUES ('Essai')", [])?;
        let playlist_id = conn.last_insert_rowid();
        conn.execute(
            "INSERT INTO playlist_tracks (playlist_id, track_id, position) VALUES (?1, ?2, 0)",
            params![playlist_id, id],
        )?;
        conn.execute("INSERT INTO favorites (track_id) VALUES (?1)", [id])?;
        Ok(())
    })
    .unwrap_or_else(|error| panic!("dépendances : {error}"));
    let removed = db
        .with(|conn| tracks::remove(conn, id))
        .unwrap_or_else(|error| panic!("retrait : {error}"));
    assert!(removed);
    let remaining: i64 = db
        .with(|conn| {
            Ok(conn.query_row(
                "SELECT (SELECT COUNT(*) FROM tracks) + (SELECT COUNT(*) FROM playlist_tracks) + (SELECT COUNT(*) FROM favorites)",
                [],
                |row| row.get(0),
            )?)
        })
        .unwrap_or_else(|error| panic!("comptage : {error}"));
    assert_eq!(remaining, 0);
}

#[test]
fn remove_reports_unknown_track() {
    let db = Database::in_memory().unwrap_or_else(|error| panic!("base : {error}"));
    let removed = db
        .with(|conn| tracks::remove(conn, 999))
        .unwrap_or_else(|error| panic!("retrait : {error}"));
    assert!(!removed);
}
