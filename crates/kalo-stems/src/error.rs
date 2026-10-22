use thiserror::Error;

#[derive(Debug, Error)]
pub enum StemError {
    #[error("Séparation annulée.")]
    Cancelled,
    #[error("Fichier audio illisible : {0}")]
    Decode(String),
    #[error("Modèle de séparation absent ou invalide : {0}")]
    Model(String),
    #[error("Moteur de séparation : {0}")]
    Engine(String),
    #[error("Téléchargement impossible : {0}")]
    Download(String),
    #[error("Erreur de fichier : {0}")]
    Io(#[from] std::io::Error),
}
