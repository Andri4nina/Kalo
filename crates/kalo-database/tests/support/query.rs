use kalo_core::TrackQuery;
use kalo_database::{roots, Database};

use super::insert;

pub fn query() -> TrackQuery {
    TrackQuery {
        search: None,
        sort: "title".into(),
        favorites_only: false,
        playlist_id: None,
        limit: 100,
        offset: 0,
        format: None,
        availability: None,
        min_duration_ms: None,
        max_duration_ms: None,
    }
}

pub fn metadata_row(db: &Database, id: i64) -> (String, i64, Option<i64>, Option<String>, Option<i64>) {
    db.with(|conn| {
        Ok(conn.query_row(
            "SELECT title, artist_id, album_id, genre, year FROM tracks WHERE id = ?1",
            [id],
            |row| {
                Ok((
                    row.get::<_, String>(0)?,
                    row.get::<_, i64>(1)?,
                    row.get::<_, Option<i64>>(2)?,
                    row.get::<_, Option<String>>(3)?,
                    row.get::<_, Option<i64>>(4)?,
                ))
            },
        )?)
    })
    .unwrap_or_else(|error| panic!("lecture : {error}"))
}

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
