use std::fs;
use std::path::PathBuf;

use kalo_library::{apply_changes, classify, owner, Change};

mod support;

use support::{import_fixture, track_count, wav_bytes};

#[test]
fn paths_are_classified_and_owned_by_the_deepest_root() {
    assert_eq!(classify(&PathBuf::from("D:/Music/a.MP3")), Change::File);
    assert_eq!(classify(&PathBuf::from("D:/Music/Album")), Change::Folder);
    assert_eq!(classify(&PathBuf::from("D:/Music/.a.mp3.kalo-part")), Change::Ignore);
    assert_eq!(classify(&PathBuf::from("D:/Music/cover.jpg")), Change::Ignore);
    let roots = vec![(1, PathBuf::from("D:/Music")), (2, PathBuf::from("D:/Music/Live"))];
    assert_eq!(owner(&roots, &PathBuf::from("D:/Music/Live/a.mp3")), Some(2));
    assert_eq!(owner(&roots, &PathBuf::from("D:/Music/b.mp3")), Some(1));
    assert_eq!(owner(&roots, &PathBuf::from("E:/Autre/c.mp3")), None);
}

#[test]
fn changes_index_new_files_and_flag_vanished_ones() {
    let fx = import_fixture("changes");
    let album = fx.root_dir.join("Album");
    fs::create_dir_all(&album).unwrap_or_else(|error| panic!("dossier : {error}"));
    for name in ["un.wav", "deux.wav"] {
        fs::write(album.join(name), wav_bytes()).unwrap_or_else(|error| panic!("fichier : {error}"));
    }
    let added = apply_changes(&fx.db, fx.root_id, fx.cache(), std::slice::from_ref(&album))
        .unwrap_or_else(|error| panic!("ajout : {error}"));
    assert_eq!((added.indexed, added.missing, added.rescanned), (2, 0, false));
    assert_eq!(track_count(&fx.db), 2);
    let removed = album.join("un.wav");
    fs::remove_file(&removed).unwrap_or_else(|error| panic!("suppression : {error}"));
    let flagged =
        apply_changes(&fx.db, fx.root_id, fx.cache(), &[removed]).unwrap_or_else(|error| panic!("retrait : {error}"));
    assert_eq!(flagged.missing, 1);
    assert_eq!(track_count(&fx.db), 2, "la référence est conservée, marquée manquante");
    fx.cleanup();
}
