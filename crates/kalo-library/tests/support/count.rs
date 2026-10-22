use kalo_core::TrackQuery;
use kalo_database::{tracks, Database};

/// Number of indexed tracks, all roots included.
pub fn track_count(db: &Database) -> i64 {
    let query = TrackQuery {
        search: None,
        sort: "title".into(),
        favorites_only: false,
        playlist_id: None,
        limit: 500,
        offset: 0,
        format: None,
        availability: None,
        min_duration_ms: None,
        max_duration_ms: None,
    };
    db.with(|conn| tracks::count(conn, &query))
        .unwrap_or_else(|error| panic!("comptage : {error}"))
}
