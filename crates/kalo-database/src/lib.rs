mod database;
mod error;
mod migrations;

pub mod albums;
pub mod artists;
pub mod backup;
pub mod playlists;
pub mod restore;
pub mod roots;
pub mod tracks;

pub use database::Database;
pub use error::{DbError, DbResult};
