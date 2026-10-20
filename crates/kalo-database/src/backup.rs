use std::fs;
use std::path::Path;

use rusqlite::{params, Connection, OpenFlags};

use crate::{DbError, DbResult};

/// Writes a consistent snapshot with `VACUUM INTO`. Existing files are never
/// overwritten, and a snapshot failing its integrity check is removed.
pub fn to_file(conn: &Connection, destination: &Path) -> DbResult<()> {
    if destination.exists() {
        return Err(DbError::Invalid("Le fichier de sauvegarde existe déjà.".to_owned()));
    }
    if let Some(parent) = destination.parent().filter(|path| !path.as_os_str().is_empty()) {
        fs::create_dir_all(parent)?;
    }
    let target = destination.to_string_lossy().to_string();
    conn.execute("VACUUM INTO ?1", params![target])?;
    let check: String = Connection::open_with_flags(destination, OpenFlags::SQLITE_OPEN_READ_ONLY)?.query_row(
        "PRAGMA quick_check",
        [],
        |row| row.get(0),
    )?;
    if check == "ok" {
        return Ok(());
    }
    let _ = fs::remove_file(destination);
    Err(DbError::Invalid("La sauvegarde créée est corrompue.".to_owned()))
}
