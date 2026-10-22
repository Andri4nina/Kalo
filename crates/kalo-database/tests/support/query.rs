use kalo_core::TrackQuery;
use kalo_database::Database;

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
        kind: None,
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
