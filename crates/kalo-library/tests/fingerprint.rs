use std::fs;

use kalo_database::{roots, tracks, Database};
use kalo_library::{fingerprint, scan_root};

mod support;

use support::{temp_dir, wav_bytes};

#[test]
fn identical_files_are_grouped_by_content() {
    let root_dir = temp_dir("fingerprint");
    let cache = temp_dir("fingerprint-cache");
    let mut different = wav_bytes();
    if let Some(last) = different.last_mut() {
        *last = 9;
    }
    for (name, bytes) in [("a.wav", wav_bytes()), ("b.wav", wav_bytes()), ("c.wav", different)] {
        fs::write(root_dir.join(name), bytes).unwrap_or_else(|error| panic!("fichier : {error}"));
    }
    let db = Database::in_memory().unwrap_or_else(|error| panic!("base : {error}"));
    let root = db
        .with(|conn| roots::add(conn, &root_dir.to_string_lossy()))
        .unwrap_or_else(|error| panic!("racine : {error}"));
    scan_root(&db, root.id, &cache, |_| {}).unwrap_or_else(|error| panic!("analyse : {error}"));
    let summary = fingerprint(&db, |_| {}).unwrap_or_else(|error| panic!("empreintes : {error}"));
    assert_eq!((summary.hashed, summary.errors), (3, 0));
    let groups = db
        .with(|conn| tracks::content_duplicates(conn))
        .unwrap_or_else(|error| panic!("groupes : {error}"));
    assert_eq!(groups.len(), 1);
    assert_eq!(groups[0].tracks.len(), 2);
    let second = fingerprint(&db, |_| {}).unwrap_or_else(|error| panic!("relance : {error}"));
    assert_eq!(second.hashed, 0, "les empreintes valides ne sont pas recalculées");
    let _ = fs::remove_dir_all(root_dir);
    let _ = fs::remove_dir_all(cache);
}
