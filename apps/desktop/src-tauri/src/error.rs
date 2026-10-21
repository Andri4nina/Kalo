use serde::{Serialize, Serializer};
use thiserror::Error;

use kalo_database::DbError;
use kalo_library::LibraryError;

#[derive(Debug, Error)]
pub enum CommandError {
    #[error("{0}")]
    Database(#[from] DbError),
    #[error("{0}")]
    Library(#[from] LibraryError),
    #[error("{0}")]
    Invalid(String),
    #[error("Morceau introuvable.")]
    NotFound,
    #[error("Une analyse est déjà en cours.")]
    Busy,
}

/// IPC errors reach JavaScript as a readable string.
impl Serialize for CommandError {
    fn serialize<S: Serializer>(&self, serializer: S) -> Result<S::Ok, S::Error> {
        serializer.serialize_str(&self.to_string())
    }
}
