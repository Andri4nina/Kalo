mod support;

use std::fs;

use kalo_database::{backup, restore};

#[test]
fn backup_never_overwrites_and_restore_rejects_an_invalid_file() {
    let db = support::database();
    let file = support::temp_db("backup-invalid");
    support::cleanup(&file);
    fs::write(&file, b"not a database").unwrap_or_else(|error| panic!("ecriture : {error}"));
    assert!(db.with(|conn| backup::to_file(conn, &file)).is_err());
    assert!(db.with(|conn| restore::from_file(conn, &file)).is_err());
    support::cleanup(&file);
}

#[test]
fn restore_rejects_a_foreign_database() {
    let db = support::database();
    let root = support::add_root(&db);
    support::insert(&db, root, "keep.mp3");
    let file = support::temp_db("backup-foreign");
    support::cleanup(&file);
    let foreign = rusqlite::Connection::open(&file).unwrap_or_else(|error| panic!("base : {error}"));
    foreign
        .execute_batch("CREATE TABLE foo (id INTEGER); PRAGMA user_version = 1;")
        .unwrap_or_else(|error| panic!("schema : {error}"));
    drop(foreign);
    assert!(db.with(|conn| restore::from_file(conn, &file)).is_err());
    assert_eq!(support::count_tracks(&db), 1);
    support::cleanup(&file);
}
