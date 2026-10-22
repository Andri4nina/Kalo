use kalo_database::{roots, Database};

use super::insert;

pub fn filtered_database() -> (Database, i64) {
    let db = Database::in_memory().unwrap_or_else(|error| panic!("base : {error}"));
    let root = db
        .with(|conn| roots::add(conn, "C:/musique"))
        .unwrap_or_else(|error| panic!("racine : {error}"));
    insert(&db, root.id, "C:/musique/a.mp3");
    insert(&db, root.id, "C:/musique/b.flac");
    db.with(|conn| Ok(conn.execute("UPDATE tracks SET format = 'FLAC' WHERE path LIKE '%.flac'", [])?))
        .unwrap_or_else(|error| panic!("format : {error}"));
    (db, root.id)
}
