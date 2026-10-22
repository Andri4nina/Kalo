//! Read-only music library scanning. Original audio files are never modified.

mod batch;
mod changes;
mod cover;
mod error;
mod extensions;
mod fingerprint;
mod index;
mod metadata;
mod organize;
mod paths;
mod scan;
mod track;
mod videos;

pub use changes::{apply_changes, audio_under, classify, owner, Change};
pub use cover::store as store_cover;
pub use error::LibraryError;
pub use extensions::{is_supported, is_video};
pub use fingerprint::{fingerprint, hash_file};
pub use index::index_files;
pub use organize::{import_files, next_free, safe_name, target_path};
pub use scan::scan_root;
pub use videos::scan_videos;
