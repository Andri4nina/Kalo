use rusqlite::{params, Connection};

use crate::{albums, artists, DbResult};

pub fn update(
    conn: &Connection,
    track_id: i64,
    title: &str,
    artist: &str,
    album: Option<&str>,
    genre: Option<&str>,
    year: Option<i64>,
) -> DbResult<bool> {
    let artist_id = artists::ensure(conn, artist)?;
    let album_id = match album.filter(|value| !value.trim().is_empty()) {
        Some(name) => Some(albums::ensure(conn, name, artist_id, year)?),
        None => None,
    };
    let changed = conn.execute(
        "UPDATE tracks SET title = ?2, artist_id = ?3, album_id = ?4, genre = ?5, year = ?6 WHERE id = ?1",
        params![track_id, title.trim(), artist_id, album_id, genre, year],
    )?;
    Ok(changed > 0)
}
