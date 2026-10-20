mod support;

use kalo_database::{albums, artists};

#[test]
fn browse_lists_filter_by_artist_or_album_name() {
    let db = support::database();
    let root = support::add_root(&db);
    support::insert_with(&db, root, "alpha.mp3", "Alpha", "Premier");
    support::insert_with(&db, root, "beta.mp3", "Beta", "Second");
    let alpha = db
        .with(|conn| artists::list(conn, Some("alp")))
        .unwrap_or_else(|error| panic!("artistes : {error}"));
    assert_eq!(alpha.len(), 1);
    assert_eq!(alpha[0].name, "Alpha");
    let by_title = db
        .with(|conn| albums::list(conn, Some("premier")))
        .unwrap_or_else(|error| panic!("albums : {error}"));
    assert_eq!(by_title.len(), 1);
    assert_eq!(by_title[0].title, "Premier");
    let by_artist = db
        .with(|conn| albums::list(conn, Some("beta")))
        .unwrap_or_else(|error| panic!("albums : {error}"));
    assert_eq!(by_artist.len(), 1);
    assert_eq!(by_artist[0].title, "Second");
    let none = db
        .with(|conn| artists::list(conn, Some("zzz")))
        .unwrap_or_else(|error| panic!("artistes : {error}"));
    assert!(none.is_empty());
    support::insert_with(&db, root, "percent.mp3", "100% Pur", "Mix");
    let literal = db
        .with(|conn| artists::list(conn, Some("%")))
        .unwrap_or_else(|error| panic!("artistes : {error}"));
    assert_eq!(literal.len(), 1);
    assert_eq!(literal[0].name, "100% Pur");
}
