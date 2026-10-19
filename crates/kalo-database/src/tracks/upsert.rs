use kalo_core::NewTrack;
use rusqlite::Connection;

use crate::{albums, artists, DbResult};

mod write;

pub fn upsert(conn: &Connection, track: &NewTrack) -> DbResult<(i64, bool)> {
    let existed: bool = conn.query_row(
        "SELECT EXISTS(SELECT 1 FROM tracks WHERE path = ?1)",
        [&track.path],
        |row| row.get(0),
    )?;
    let artist = track.artist.as_deref().filter(|value| !value.trim().is_empty());
    let artist_id = artists::ensure(conn, artist.unwrap_or("Artiste inconnu"))?;
    let album_id = match track.album.as_deref().filter(|value| !value.trim().is_empty()) {
        Some(title) => Some(albums::ensure(conn, title, artist_id, track.year)?),
        None => None,
    };
    let id = write::save(conn, track, artist_id, album_id)?;
    Ok((id, !existed))
}
