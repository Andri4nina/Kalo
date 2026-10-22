use std::fs;

use kalo_library::import_files;

mod support;

use support::{import_fixture, track_count, wav_bytes};

#[test]
fn import_copies_verifies_indexes_and_keeps_sources() {
    let fx = import_fixture("import-copy");
    let text = fx.source.with_file_name("notes.txt");
    fs::write(&text, b"texte").unwrap_or_else(|error| panic!("texte : {error}"));
    let sources = vec![
        fx.source.to_string_lossy().into_owned(),
        text.to_string_lossy().into_owned(),
    ];
    let first =
        import_files(&fx.db, fx.root_id, fx.cache(), &sources).unwrap_or_else(|error| panic!("import : {error}"));
    assert_eq!((first.copied, first.already_present, first.failed.len()), (1, 0, 1));
    let copy = fx.root_dir.join("Artiste inconnu").join("Morceau.wav");
    assert_eq!(fs::read(&copy).ok(), Some(wav_bytes()));
    assert!(fx.source.exists(), "la source doit rester en place");
    assert_eq!(track_count(&fx.db), 1);
    let again = import_files(&fx.db, fx.root_id, fx.cache(), &sources[..1])
        .unwrap_or_else(|error| panic!("réimport : {error}"));
    assert_eq!((again.copied, again.already_present), (0, 1));
    assert_eq!(track_count(&fx.db), 1);
    fx.cleanup();
}
