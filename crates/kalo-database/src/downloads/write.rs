use rusqlite::{params, Connection};

use crate::DbResult;

/// What the user asked to download, before any byte is received.
pub struct NewDownload<'a> {
    pub url: &'a str,
    pub file_name: &'a str,
    pub provider: &'a str,
    pub license: Option<&'a str>,
    pub expected_md5: Option<&'a str>,
    pub root_id: i64,
}

pub fn create(conn: &Connection, new: &NewDownload<'_>) -> DbResult<i64> {
    Ok(conn.query_row(
        "INSERT INTO downloads (url, file_name, provider, license, expected_md5, root_id, status)
         VALUES (?1, ?2, ?3, ?4, ?5, ?6, 'queued') RETURNING id",
        params![
            new.url,
            new.file_name,
            new.provider,
            new.license,
            new.expected_md5,
            new.root_id
        ],
        |row| row.get(0),
    )?)
}

pub fn delete(conn: &Connection, id: i64) -> DbResult<bool> {
    Ok(conn.execute("DELETE FROM downloads WHERE id = ?1", [id])? > 0)
}
