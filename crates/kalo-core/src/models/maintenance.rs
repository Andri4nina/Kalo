use serde::{Deserialize, Serialize};

/// Progress of the content fingerprinting pass (files hashed so far).
#[derive(Debug, Clone, Copy, Default, Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct FingerprintProgress {
    pub done: i64,
    pub total: i64,
}

#[derive(Debug, Clone, Copy, Default, Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct FingerprintSummary {
    pub hashed: i64,
    pub errors: i64,
    pub duration_ms: i64,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct FileImportFailure {
    pub path: String,
    pub reason: String,
}

/// Result of copying files into a library root (sources are never modified).
#[derive(Debug, Clone, Default, Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct FileImportReport {
    pub copied: i64,
    pub already_present: i64,
    pub failed: Vec<FileImportFailure>,
}
