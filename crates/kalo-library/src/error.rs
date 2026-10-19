use thiserror::Error;

#[derive(Debug, Error)]
pub enum LibraryError {
    #[error("Erreur de base de données : {0}")]
    Database(#[from] kalo_database::DbError),
    #[error("Erreur d'accès au fichier : {0}")]
    Io(#[from] std::io::Error),
    #[error("Dossier introuvable ou invalide : {0}")]
    InvalidRoot(String),
    #[error("Analyse déjà en cours")]
    Busy,
}
