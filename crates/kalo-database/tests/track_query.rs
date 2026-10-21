use kalo_database::tracks;

mod support;

use support::{filtered_database, query};

#[test]
fn filters_by_format_and_duration() {
    let (db, _) = filtered_database();
    let mut format = query();
    format.format = Some("MP3".into());
    let items = db
        .with(|conn| tracks::list(conn, &format))
        .unwrap_or_else(|error| panic!("liste : {error}"));
    assert_eq!(items.len(), 1);
    let mut long = query();
    long.min_duration_ms = Some(2_000);
    let items = db
        .with(|conn| tracks::list(conn, &long))
        .unwrap_or_else(|error| panic!("liste : {error}"));
    assert!(items.is_empty());
}

#[test]
fn filters_by_availability() {
    let (db, _) = filtered_database();
    db.with(|conn| Ok(conn.execute("UPDATE tracks SET is_missing = 1 WHERE path LIKE '%.mp3'", [])?))
        .unwrap_or_else(|error| panic!("marquage : {error}"));
    let mut missing = query();
    missing.availability = Some("missing".into());
    let items = db
        .with(|conn| tracks::list(conn, &missing))
        .unwrap_or_else(|error| panic!("liste : {error}"));
    assert_eq!(items.len(), 1);
    assert!(items[0].is_missing);
}

#[test]
fn search_treats_wildcards_literally() {
    let (db, _) = filtered_database();
    let mut search = query();
    search.search = Some("%".into());
    let items = db
        .with(|conn| tracks::list(conn, &search))
        .unwrap_or_else(|error| panic!("liste : {error}"));
    assert!(items.is_empty());
}
