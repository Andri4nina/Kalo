mod database;
mod error;
mod migrations;

pub mod albums;
pub mod artists;
pub mod playlists;
pub mod roots;
pub mod tracks;

pub use database::Database;
pub use error::{DbError, DbResult};
