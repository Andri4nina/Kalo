use std::fs;

use kalo_library::import_files;

mod support;

use support::{import_fixture, track_count, wav_bytes};

#[test]
fn import_never_overwrites_and_keeps_files_already_inside() {
    let fx = import_fixture("import-rename");
    let sources = vec![fx.source.to_string_lossy().into_owned()];
    import_files(&fx.db, fx.root_id, fx.cache(), &sources).unwrap_or_else(|error| panic!("import : {error}"));
    let mut other = wav_bytes();
    if let Some(last) = other.last_mut() {
        *last = 7;
    }
    fs::write(&fx.source, other).unwrap_or_else(|error| panic!("variante : {error}"));
    let renamed =
        import_files(&fx.db, fx.root_id, fx.cache(), &sources).unwrap_or_else(|error| panic!("variante : {error}"));
    assert_eq!(renamed.copied, 1);
    let folder = fx.root_dir.join("Artiste inconnu");
    assert_eq!(
        fs::read(folder.join("Morceau.wav")).ok(),
        Some(wav_bytes()),
        "le premier fichier est intact"
    );
    assert!(folder.join("Morceau (2).wav").exists());
    let inside = vec![folder.join("Morceau.wav").to_string_lossy().into_owned()];
    let kept =
        import_files(&fx.db, fx.root_id, fx.cache(), &inside).unwrap_or_else(|error| panic!("interne : {error}"));
    assert_eq!((kept.copied, kept.already_present), (0, 1));
    assert_eq!(track_count(&fx.db), 2);
    fx.cleanup();
}
