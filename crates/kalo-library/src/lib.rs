//! Read-only music library scanning. Original audio files are never modified.

mod batch;
mod cover;
mod error;
mod extensions;
mod metadata;
mod paths;
mod scan;
mod track;

pub use error::LibraryError;
pub use extensions::is_supported;
pub use scan::scan_root;
