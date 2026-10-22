mod support;

use kalo_database::playlists;

#[test]
fn details_and_cover_are_persisted_and_validated() {
    let db = support::database();
    let playlist = db
        .with(|conn| playlists::create_playlist(conn, "Route"))
        .unwrap_or_else(|error| panic!("création : {error}"));
    let updated = db
        .with(|conn| playlists::update_details(conn, playlist.id, "  Pour le trajet  "))
        .unwrap_or_else(|error| panic!("description : {error}"));
    assert_eq!(updated.description, "Pour le trajet");
    let too_long = "a".repeat(501);
    assert!(db
        .with(|conn| playlists::update_details(conn, playlist.id, &too_long))
        .is_err());
    assert!(db.with(|conn| playlists::update_details(conn, 9_999, "x")).is_err());
    let covered = db
        .with(|conn| playlists::set_cover(conn, playlist.id, Some("C:/cache/cover.jpg")))
        .unwrap_or_else(|error| panic!("pochette : {error}"));
    assert_eq!(covered.cover_path.as_deref(), Some("C:/cache/cover.jpg"));
    let cleared = db
        .with(|conn| playlists::set_cover(conn, playlist.id, None))
        .unwrap_or_else(|error| panic!("retrait : {error}"));
    assert_eq!(cleared.cover_path, None);
    assert!(db.with(|conn| playlists::set_cover(conn, 9_999, None)).is_err());
}

#[test]
fn copy_name_stays_within_limit() {
    assert_eq!(playlists::copy_name("Soirée"), "Soirée (copie)");
    let long = "é".repeat(80);
    assert_eq!(playlists::copy_name(&long).chars().count(), 80);
}
