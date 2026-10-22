use kalo_core::{RemoteFile, RemoteItem};
use kalo_downloads::providers::{InternetArchive, Provider};

use crate::CommandError;

fn failure(error: kalo_downloads::DownloadError) -> CommandError {
    CommandError::Invalid(error.to_string())
}

/// Freely licensed audio works of the Internet Archive matching `query`.
#[tauri::command]
pub async fn download_search(query: String) -> Result<Vec<RemoteItem>, CommandError> {
    tauri::async_runtime::spawn_blocking(move || InternetArchive.search(&query).map_err(failure))
        .await
        .map_err(|error| CommandError::Invalid(error.to_string()))?
}

/// Audio files of one Internet Archive work, with their published MD5.
#[tauri::command]
pub async fn download_files(item: String) -> Result<Vec<RemoteFile>, CommandError> {
    tauri::async_runtime::spawn_blocking(move || InternetArchive.files(&item).map_err(failure))
        .await
        .map_err(|error| CommandError::Invalid(error.to_string()))?
}
