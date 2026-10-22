use thiserror::Error;

#[derive(Debug, Error)]
pub enum DownloadError {
    #[error("Adresse refusée : {0}")]
    Url(String),
    #[error("Réseau : {0}")]
    Network(String),
    #[error("Téléchargement annulé.")]
    Cancelled,
    #[error("Téléchargement mis en pause.")]
    Paused,
    #[error("Fichier rejeté : {0}")]
    Rejected(String),
    #[error("Réponse inattendue du service : {0}")]
    Service(String),
    #[error("Erreur de fichier : {0}")]
    Io(#[from] std::io::Error),
}
