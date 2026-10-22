use std::path::Path;

use kalo_database::{videos, Database};
use walkdir::WalkDir;

use crate::{extensions, LibraryError};

mod describe;

use describe::describe;

/// Indexes the video clips of a root (read-only) and flags vanished ones.
/// Returns how many videos were seen.
pub fn scan_videos(db: &Database, root_id: i64, root: &Path, mark: i64) -> Result<i64, LibraryError> {
    let mut seen = 0;
    for entry in WalkDir::new(root)
        .follow_links(false)
        .into_iter()
        .filter_map(Result::ok)
    {
        let path = entry.path();
        if !path.is_file() || !extensions::is_video(path) {
            continue;
        }
        let video = describe(path, root_id, mark);
        db.with(|conn| videos::upsert(conn, &video))?;
        seen += 1;
    }
    db.with(|conn| videos::finish_scan(conn, root_id, mark))?;
    Ok(seen)
}
