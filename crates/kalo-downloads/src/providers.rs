//! Extensible catalogue of sources that allow downloading their works.

use kalo_core::{RemoteFile, RemoteItem};

use crate::DownloadError;

mod archive;
mod archive_files;
mod archive_parse;

pub use archive::InternetArchive;
pub use archive_files::parse_files;
pub use archive_parse::parse_items;

pub trait Provider {
    /// Stable identifier stored with each download (`archive`).
    fn id(&self) -> &'static str;
    /// Works matching `query`, limited to freely licensed ones.
    fn search(&self, query: &str) -> Result<Vec<RemoteItem>, DownloadError>;
    /// Audio files of one work, with the checksum the source publishes.
    fn files(&self, item: &str) -> Result<Vec<RemoteFile>, DownloadError>;
}

/// Every provider compiled into Kalo.
pub fn providers() -> Vec<Box<dyn Provider>> {
    vec![Box::new(InternetArchive)]
}
