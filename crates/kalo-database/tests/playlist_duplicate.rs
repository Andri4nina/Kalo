mod support;

use kalo_database::playlists;

#[test]
fn duplicate_copies_order_and_details_without_touching_source() {
    let db = support::database();
    let root = support::add_root(&db);
    let first = support::insert(&db, root, "first.mp3");
    let second = support::insert(&db, root, "second.mp3");
    let source = db
        .with(|conn| playlists::create_playlist(conn, "Soirée"))
        .unwrap_or_else(|error| panic!("création : {error}"));
    for track in [second, first] {
        db.with(|conn| playlists::add_track(conn, source.id, track))
            .unwrap_or_else(|error| panic!("ajout : {error}"));
    }
    db.with(|conn| playlists::update_details(conn, source.id, "Calme"))
        .unwrap_or_else(|error| panic!("description : {error}"));
    let copy = db
        .with(|conn| playlists::duplicate(conn, source.id))
        .unwrap_or_else(|error| panic!("duplication : {error}"));
    assert_ne!(copy.id, source.id);
    assert_eq!(copy.name, "Soirée (copie)");
    assert_eq!(copy.description, "Calme");
    assert_eq!(copy.track_count, 2);
    let order = |id: i64| {
        db.with(|conn| playlists::list_tracks(conn, id))
            .unwrap_or_else(|error| panic!("ordre : {error}"))
            .iter()
            .map(|track| track.id)
            .collect::<Vec<_>>()
    };
    assert_eq!(order(copy.id), vec![second, first]);
    db.with(|conn| playlists::remove_track(conn, copy.id, second))
        .unwrap_or_else(|error| panic!("retrait : {error}"));
    assert_eq!(order(source.id), vec![second, first]);
    assert!(db.with(|conn| playlists::duplicate(conn, 9_999)).is_err());
    assert_eq!(support::count_tracks(&db), 2);
}
