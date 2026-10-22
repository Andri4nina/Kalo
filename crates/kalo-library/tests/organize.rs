use std::fs;
use std::path::Path;

use kalo_library::{next_free, safe_name, target_path};

mod support;

#[test]
fn names_are_safe_on_every_platform() {
    assert_eq!(safe_name("AC/DC: Live?", "x"), "AC_DC_ Live_");
    assert_eq!(safe_name("  Titre...  ", "x"), "Titre");
    assert_eq!(safe_name("", "Sans titre"), "Sans titre");
    assert_eq!(safe_name("///", "Artiste inconnu"), "Artiste inconnu");
    assert_eq!(safe_name("con", "x"), "con_");
    assert_eq!(safe_name("Nul.txt", "x"), "Nul.txt_");
    assert_eq!(safe_name(&"é".repeat(150), "x").chars().count(), 100);
}

#[test]
fn target_follows_artist_then_title() {
    let path = target_path(Path::new("D:/Music"), Some("Nina Rava"), "Soleil levant", "MP3");
    assert_eq!(path, Path::new("D:/Music").join("Nina Rava").join("Soleil levant.mp3"));
    let unknown = target_path(Path::new("D:/Music"), None, "Piste", "flac");
    assert_eq!(
        unknown,
        Path::new("D:/Music").join("Artiste inconnu").join("Piste.flac")
    );
}

#[test]
fn next_free_never_reuses_an_existing_name() {
    let directory = support::temp_dir("next-free");
    let first = directory.join("Titre.mp3");
    assert_eq!(next_free(&first), first);
    fs::write(&first, b"a").unwrap_or_else(|error| panic!("fichier : {error}"));
    assert_eq!(next_free(&first), directory.join("Titre (2).mp3"));
    fs::write(directory.join("Titre (2).mp3"), b"b").unwrap_or_else(|error| panic!("fichier : {error}"));
    assert_eq!(next_free(&first), directory.join("Titre (3).mp3"));
    let _ = fs::remove_dir_all(directory);
}
