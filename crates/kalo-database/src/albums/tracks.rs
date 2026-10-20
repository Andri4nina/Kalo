use kalo_core::TrackPage;
use rusqlite::Connection;

use crate::{tracks::by, DbResult};

const FILTER: &str = "t.album_id = ?1";

pub fn page(conn: &Connection, album_id: i64, limit: i64, offset: i64) -> DbResult<TrackPage> {
    let (items, total) = by::page(conn, FILTER, album_id, limit, offset)?;
    Ok(TrackPage { items, total })
}
