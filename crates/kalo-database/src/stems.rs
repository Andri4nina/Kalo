//! Separation jobs. Output folders belong to Kalo, never to the user library.

mod read;
mod write;

pub use read::{get, list};
pub use write::{create, delete, finish, mark_interrupted};
