use kalo_core::LibraryRoot;
use rusqlite::Row;

pub const COLUMNS: &str = "id, path, added_at, last_scan_at";

pub fn map(row: &Row<'_>) -> rusqlite::Result<LibraryRoot> {
    Ok(LibraryRoot {
        id: row.get(0)?,
        path: row.get(1)?,
        added_at: row.get(2)?,
        last_scan_at: row.get(3)?,
    })
}
