use std::path::Path;

use kalo_library::is_supported;

#[test]
fn accepts_webview_playable_formats() {
    for name in ["song.mp3", "song.FLAC", "song.m4a", "song.ogg", "song.opus", "song.wav"] {
        assert!(is_supported(Path::new(name)), "format attendu : {name}");
    }
}

#[test]
fn rejects_unknown_or_missing_extensions() {
    for name in ["notes.txt", "cover.jpg", "audio", "song.wma", "song.ape"] {
        assert!(!is_supported(Path::new(name)), "format refusé : {name}");
    }
}
