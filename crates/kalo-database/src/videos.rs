//! Video clips, indexed separately from music. Rows only reference user files.

mod read;
mod write;

pub use read::list;
pub use write::{finish_scan, upsert};
