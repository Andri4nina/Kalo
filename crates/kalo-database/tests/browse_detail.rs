mod support;

use kalo_database::{albums, artists};

#[test]
fn browse_details_return_counts_and_none_for_unknown_ids() {
    let db = support::database();
    let root = support::add_root(&db);
    support::insert_with(&db, root, "detail-1.mp3", "Alpha", "Premier");
    support::insert_with(&db, root, "detail-2.mp3", "Alpha", "Second");
    let artist = db
        .with(|conn| artists::list(conn))
        .unwrap_or_else(|error| panic!("artistes : {error}"))
        .remove(0);
    let detail = db
        .with(|conn| artists::get(conn, artist.id))
        .unwrap_or_else(|error| panic!("artiste : {error}"))
        .unwrap_or_else(|| panic!("artiste absent"));
    assert_eq!(detail.track_count, 2);
    assert_eq!(detail.album_count, 2);
    let album = db
        .with(|conn| albums::list(conn))
        .unwrap_or_else(|error| panic!("albums : {error}"))
        .remove(0);
    let album_detail = db
        .with(|conn| albums::get(conn, album.id))
        .unwrap_or_else(|error| panic!("album : {error}"))
        .unwrap_or_else(|| panic!("album absent"));
    assert_eq!(album_detail.track_count, 1);
    let unknown = db
        .with(|conn| artists::get(conn, 9_999))
        .unwrap_or_else(|error| panic!("identifiant inconnu : {error}"));
    assert!(unknown.is_none());
}
