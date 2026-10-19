use kalo_core::NewTrack;
use rusqlite::{params, Connection};

use crate::DbResult;

pub fn save(conn: &Connection, track: &NewTrack, artist_id: i64, album_id: Option<i64>) -> DbResult<i64> {
    Ok(conn.query_row(
        "INSERT INTO tracks (path, root_id, title, artist_id, album_id, genre, year, track_no, disc_no,
             duration_ms, format, bitrate, sample_rate, channels, size_bytes, mtime, cover_path, scan_mark)
         VALUES (?1, ?2, ?3, ?4, ?5, ?6, ?7, ?8, ?9, ?10, ?11, ?12, ?13, ?14, ?15, ?16, ?17, ?18)
         ON CONFLICT(path) DO UPDATE SET
             root_id = excluded.root_id, title = excluded.title, artist_id = excluded.artist_id,
             album_id = excluded.album_id, genre = excluded.genre, year = excluded.year,
             track_no = excluded.track_no, disc_no = excluded.disc_no,
             duration_ms = excluded.duration_ms, format = excluded.format,
             bitrate = excluded.bitrate, sample_rate = excluded.sample_rate,
             channels = excluded.channels, size_bytes = excluded.size_bytes, mtime = excluded.mtime,
             cover_path = excluded.cover_path, is_missing = 0, scan_mark = excluded.scan_mark,
             updated_at = unixepoch()
         RETURNING id",
        params![
            &track.path,
            track.root_id,
            &track.title,
            artist_id,
            album_id,
            &track.genre,
            track.year,
            track.track_no,
            track.disc_no,
            track.duration_ms,
            &track.format,
            track.bitrate,
            track.sample_rate,
            track.channels,
            track.size_bytes,
            track.mtime,
            &track.cover_path,
            track.scan_mark
        ],
        |row| row.get(0),
    )?)
}
