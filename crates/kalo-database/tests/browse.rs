mod support;

use kalo_database::{albums, artists};

#[test]
fn artists_are_aggregated_with_counts() {
    let db = support::database();
    let root = support::add_root(&db);
    support::insert_with(&db, root, "alpha-1.mp3", "Alpha", "Premier");
    support::insert_with(&db, root, "alpha-2.mp3", "Alpha", "Premier");
    support::insert_with(&db, root, "beta-1.mp3", "Beta", "Second");
    let list = db
        .with(|conn| artists::list(conn))
        .unwrap_or_else(|error| panic!("artistes : {error}"));
    assert_eq!(list.len(), 2);
    assert_eq!(list[0].name, "Alpha");
    assert_eq!(list[0].track_count, 2);
    assert_eq!(list[0].album_count, 1);
    assert_eq!(list[1].name, "Beta");
    let page = db
        .with(|conn| artists::page(conn, list[0].id, 50, 0))
        .unwrap_or_else(|error| panic!("morceaux : {error}"));
    assert_eq!(page.total, 2);
    assert!(page.items.iter().all(|track| track.artist.as_deref() == Some("Alpha")));
}

#[test]
fn albums_are_listed_with_counts_and_tracks() {
    let db = support::database();
    let root = support::add_root(&db);
    support::insert_with(&db, root, "premier-1.mp3", "Alpha", "Premier");
    support::insert_with(&db, root, "premier-2.mp3", "Alpha", "Premier");
    support::insert_with(&db, root, "second-1.mp3", "Beta", "Second");
    let list = db
        .with(|conn| albums::list(conn))
        .unwrap_or_else(|error| panic!("albums : {error}"));
    assert_eq!(list.len(), 2);
    let Some(premier) = list.iter().find(|album| album.title == "Premier") else {
        panic!("album Premier absent : {list:?}");
    };
    assert_eq!(premier.artist.as_deref(), Some("Alpha"));
    assert_eq!(premier.year, Some(2026));
    assert_eq!(premier.track_count, 2);
    let page = db
        .with(|conn| albums::page(conn, premier.id, 50, 0))
        .unwrap_or_else(|error| panic!("morceaux : {error}"));
    assert_eq!(page.total, 2);
}
