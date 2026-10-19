use std::fs;
use std::path::{Path, PathBuf};

use kalo_database::{roots, Database};
use kalo_library::{scan_root, LibraryError};

fn temp_dir(name: &str) -> PathBuf {
    let path = std::env::temp_dir().join(format!("kalo-{name}-{}", std::process::id()));
    fs::create_dir_all(&path).unwrap_or_else(|error| panic!("dossier temporaire : {error}"));
    path
}

fn database_with_root(path: &Path) -> (Database, i64) {
    let db = Database::in_memory().unwrap_or_else(|error| panic!("base : {error}"));
    let display = path.to_string_lossy().into_owned();
    let root = db
        .with(|conn| roots::add(conn, &display))
        .unwrap_or_else(|error| panic!("racine : {error}"));
    (db, root.id)
}

#[test]
fn missing_root_is_reported_without_panicking() {
    let db = Database::in_memory().unwrap_or_else(|error| panic!("base : {error}"));
    let root = db
        .with(|conn| roots::add(conn, "Z:/Kalo/absent"))
        .unwrap_or_else(|error| panic!("racine : {error}"));
    let result = scan_root(&db, root.id, &std::env::temp_dir(), |_| {});
    assert!(matches!(result, Err(LibraryError::InvalidRoot(_))));
}

#[test]
fn empty_root_returns_an_empty_summary() {
    let directory = temp_dir("empty");
    fs::write(directory.join("notes.txt"), b"not audio").unwrap_or_else(|error| panic!("fichier : {error}"));
    let (db, root_id) = database_with_root(&directory);
    let summary =
        scan_root(&db, root_id, &std::env::temp_dir(), |_| {}).unwrap_or_else(|error| panic!("analyse : {error}"));
    assert_eq!(summary.files_found, 0);
    assert_eq!(summary.imported, 0);
    assert_eq!(summary.missing, 0);
    let _ = fs::remove_dir_all(directory);
}
