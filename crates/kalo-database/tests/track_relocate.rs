use kalo_database::{roots, tracks, Database};

mod support;

use support::new_track;

#[test]
fn relocate_moves_a_missing_track_into_another_root() {
    let db = Database::in_memory().unwrap_or_else(|error| panic!("base : {error}"));
    let first = db
        .with(|conn| roots::add(conn, "C:/musique"))
        .unwrap_or_else(|error| panic!("racine : {error}"));
    let second = db
        .with(|conn| roots::add(conn, "D:/archives"))
        .unwrap_or_else(|error| panic!("racine : {error}"));
    let id = db
        .with(|conn| tracks::upsert(conn, &new_track("C:/musique/a.mp3", first.id)))
        .unwrap_or_else(|error| panic!("morceau : {error}"))
        .0;
    let changed = db
        .with(|conn| tracks::relocate(conn, id, "D:/archives/a.mp3", second.id))
        .unwrap_or_else(|error| panic!("relocalisation : {error}"));
    assert!(changed);
    let (path, root, missing) = db
        .with(|conn| {
            Ok(conn.query_row(
                "SELECT path, root_id, is_missing FROM tracks WHERE id = ?1",
                [id],
                |row| Ok((row.get::<_, String>(0)?, row.get::<_, i64>(1)?, row.get::<_, i64>(2)?)),
            )?)
        })
        .unwrap_or_else(|error| panic!("lecture : {error}"));
    assert_eq!(path, "D:/archives/a.mp3");
    assert_eq!(root, second.id);
    assert_eq!(missing, 0);
}
