use std::fs;

use kalo_core::TrackQuery;
use kalo_database::{roots, tracks, Database};
use kalo_library::scan_root;

mod support;

use support::{temp_dir, wav_bytes};

#[test]
fn scan_imports_wav_and_marks_deleted_file_missing() {
    let directory = temp_dir("import");
    let cache = temp_dir("import-cache");
    let file = directory.join("First Song.wav");
    fs::write(&file, wav_bytes()).unwrap_or_else(|error| panic!("fichier : {error}"));
    let db = Database::in_memory().unwrap_or_else(|error| panic!("base : {error}"));
    let root = db
        .with(|conn| roots::add(conn, &directory.to_string_lossy()))
        .unwrap_or_else(|error| panic!("racine : {error}"));
    let summary = scan_root(&db, root.id, &cache, |_| {}).unwrap_or_else(|error| panic!("analyse : {error}"));
    assert_eq!(summary.files_found, 1);
    assert_eq!(summary.imported, 1);
    let query = TrackQuery {
        search: None,
        sort: "title".into(),
        favorites_only: false,
        playlist_id: None,
        limit: 50,
        offset: 0,
        format: None,
        availability: None,
        min_duration_ms: None,
        max_duration_ms: None,
        kind: None,
    };
    let items = db
        .with(|conn| tracks::list(conn, &query))
        .unwrap_or_else(|error| panic!("liste : {error}"));
    assert_eq!(items.len(), 1);
    assert_eq!(items[0].title, "First Song");
    fs::remove_file(&file).unwrap_or_else(|error| panic!("suppression : {error}"));
    let second = scan_root(&db, root.id, &cache, |_| {}).unwrap_or_else(|error| panic!("analyse : {error}"));
    assert_eq!(second.missing, 1);
    let _ = fs::remove_dir_all(directory);
    let _ = fs::remove_dir_all(cache);
}
