mod support;

use kalo_database::tracks;

#[test]
fn favorite_toggle_is_reversible() {
    let db = support::database();
    let root = support::add_root(&db);
    let track = support::insert(&db, root, "favorite.mp3");
    let added = db
        .with(|conn| tracks::toggle_favorite(conn, track))
        .unwrap_or_else(|error| panic!("ajout favori : {error}"));
    assert!(added);
    let removed = db
        .with(|conn| tracks::toggle_favorite(conn, track))
        .unwrap_or_else(|error| panic!("retrait favori : {error}"));
    assert!(!removed);
}

#[test]
fn history_deduplicates_and_hides_missing_tracks() {
    let db = support::database();
    let root = support::add_root(&db);
    let track = support::insert(&db, root, "history.mp3");
    db.with(|conn| tracks::record_play(conn, track))
        .unwrap_or_else(|error| panic!("historique : {error}"));
    db.with(|conn| tracks::record_play(conn, track))
        .unwrap_or_else(|error| panic!("historique : {error}"));
    let recent = db
        .with(|conn| tracks::recent(conn, 10))
        .unwrap_or_else(|error| panic!("lecture : {error}"));
    assert_eq!(recent.len(), 1);
    db.with(|conn| tracks::finish_scan(conn, root, 1))
        .unwrap_or_else(|error| panic!("marquage : {error}"));
    let recent = db
        .with(|conn| tracks::recent(conn, 10))
        .unwrap_or_else(|error| panic!("lecture : {error}"));
    assert!(recent.is_empty());
}
