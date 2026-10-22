mod database;
mod error;
mod migrations;
mod search;

pub mod albums;
pub mod artists;
pub mod backup;
pub mod downloads;
pub mod lyrics;
pub mod playlists;
pub mod restore;
pub mod roots;
pub mod stems;
pub mod tracks;
pub mod videos;

pub use database::Database;
pub use error::{DbError, DbResult};
