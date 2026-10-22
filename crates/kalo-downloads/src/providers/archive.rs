use kalo_core::{RemoteFile, RemoteItem};
use serde_json::Value;

use super::Provider;
use super::{parse_files, parse_items};
use crate::url::encode;
use crate::DownloadError;

/// Internet Archive, restricted to audio under Creative Commons or public domain.
pub struct InternetArchive;

const FREE: &str = "(licenseurl:*creativecommons.org* OR licenseurl:*publicdomain*)";

fn get_json(url: &str) -> Result<Value, DownloadError> {
    let body = ureq::get(url)
        .call()
        .map_err(|error| DownloadError::Network(error.to_string()))?
        .into_body()
        .read_to_string()
        .map_err(|error| DownloadError::Network(error.to_string()))?;
    serde_json::from_str(&body).map_err(|error| DownloadError::Service(error.to_string()))
}

impl Provider for InternetArchive {
    fn id(&self) -> &'static str {
        "archive"
    }

    fn search(&self, query: &str) -> Result<Vec<RemoteItem>, DownloadError> {
        let terms = query.trim();
        if terms.is_empty() {
            return Ok(Vec::new());
        }
        let q = format!("({terms}) AND mediatype:audio AND {FREE}");
        let url = format!(
            "https://archive.org/advancedsearch.php?q={}&fl[]=identifier&fl[]=title&fl[]=creator&fl[]=licenseurl&rows=30&output=json",
            encode(&q)
        );
        Ok(parse_items(&get_json(&url)?))
    }

    fn files(&self, item: &str) -> Result<Vec<RemoteFile>, DownloadError> {
        let url = format!("https://archive.org/metadata/{}", encode(item));
        Ok(parse_files(item, &get_json(&url)?))
    }
}
