use thiserror::Error;

#[derive(Debug, Error)]
pub enum DbError {
    #[error("Erreur SQLite : {0}")]
    Sqlite(#[from] rusqlite::Error),
    #[error("Erreur de fichier : {0}")]
    Io(#[from] std::io::Error),
    #[error("La base de données est momentanément indisponible")]
    Locked,
    #[error("Entrée invalide : {0}")]
    Invalid(String),
    #[error("Élément introuvable : {0}")]
    NotFound(String),
}

pub type DbResult<T> = Result<T, DbError>;
