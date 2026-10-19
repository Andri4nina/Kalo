use std::path::Path;
use std::time::{SystemTime, UNIX_EPOCH};

use kalo_core::{NewTrack, ScanSummary};
use kalo_database::{roots, tracks, Database};

use crate::{batch, paths, LibraryError};

pub fn flush(db: &Database, pending: &mut Vec<NewTrack>, summary: &mut ScanSummary) -> Result<(), LibraryError> {
    let outcome = batch::flush(db, pending)?;
    summary.imported += outcome.imported;
    summary.updated += outcome.updated;
    Ok(())
}

pub fn touch(db: &Database, path: &Path, mark: i64) -> Result<(), LibraryError> {
    let path = paths::display(path);
    db.with(|conn| tracks::touch_seen(conn, &path, mark))?;
    Ok(())
}

pub fn finish(db: &Database, root_id: i64, mark: i64) -> Result<i64, LibraryError> {
    let missing = db.with(|conn| {
        let tx = conn.transaction()?;
        let missing = tracks::finish_scan(&tx, root_id, mark)?;
        roots::touch_scan(&tx, root_id)?;
        tx.commit()?;
        Ok(missing)
    })?;
    Ok(missing)
}

pub fn mark() -> i64 {
    SystemTime::now()
        .duration_since(UNIX_EPOCH)
        .map(|value| value.as_nanos() as i64)
        .unwrap_or(0)
}
