use std::path::Path;
use std::time::Duration;

use rusqlite::{backup::Backup, Connection, OpenFlags};

use crate::{migrations, DbError, DbResult};

/// Replaces the live database with a verified snapshot, then applies any
/// migration the snapshot is missing.
pub fn from_file(conn: &mut Connection, source: &Path) -> DbResult<()> {
    if !source.is_file() {
        return Err(DbError::Invalid("La sauvegarde est introuvable.".to_owned()));
    }
    let snapshot = Connection::open_with_flags(source, OpenFlags::SQLITE_OPEN_READ_ONLY)?;
    let check: String = snapshot.query_row("PRAGMA quick_check", [], |row| row.get(0))?;
    if check != "ok" {
        return Err(DbError::Invalid("La sauvegarde est corrompue.".to_owned()));
    }
    let version: i64 = snapshot.query_row("PRAGMA user_version", [], |row| row.get(0))?;
    let tables: i64 = snapshot.query_row(
        "SELECT COUNT(*) FROM sqlite_master WHERE type = 'table' \
         AND name IN ('library_roots', 'tracks', 'playlists')",
        [],
        |row| row.get(0),
    )?;
    if version < 1 || tables != 3 {
        return Err(DbError::Invalid("Ce fichier n'est pas une sauvegarde Kalo.".to_owned()));
    }
    if version > migrations::latest_version() {
        return Err(DbError::Invalid(
            "La sauvegarde provient d'une version plus récente de Kalo.".to_owned(),
        ));
    }
    {
        let target = Backup::new(&snapshot, conn)?;
        target.run_to_completion(32, Duration::from_millis(0), None)?;
    }
    conn.pragma_update(None, "journal_mode", "WAL")?;
    conn.pragma_update(None, "foreign_keys", "ON")?;
    migrations::run(conn)?;
    Ok(())
}
