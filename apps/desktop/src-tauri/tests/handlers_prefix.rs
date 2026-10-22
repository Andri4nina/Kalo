//! The IPC dispatcher routes by name prefix: every registry must only hold
//! commands whose name matches it, otherwise the command would be unreachable.

use std::fs;

fn commands(file: &str) -> Vec<String> {
    let path = format!("{}/src/handlers/{file}", env!("CARGO_MANIFEST_DIR"));
    let text = fs::read_to_string(&path).unwrap_or_else(|error| panic!("{path} : {error}"));
    text.lines()
        .map(str::trim)
        .filter(|line| line.starts_with("crate::commands::"))
        .filter_map(|line| line.trim_end_matches(',').rsplit("::").next().map(str::to_owned))
        .collect()
}

#[test]
fn each_registry_matches_the_dispatch_prefix() {
    let library = commands("library.rs");
    let playlists = commands("playlists.rs");
    let media = commands("media.rs");
    let stems = commands("stems.rs");
    let downloads = commands("downloads.rs");
    assert!(
        downloads.iter().all(|name| name.starts_with("download_")),
        "{downloads:?}"
    );
    assert!(stems.iter().all(|name| name.starts_with("stem_")), "{stems:?}");
    assert!(!library.is_empty() && !playlists.is_empty() && !media.is_empty());
    assert!(library.iter().all(|name| name.starts_with("library_")), "{library:?}");
    assert!(
        playlists.iter().all(|name| name.starts_with("playlist_")),
        "{playlists:?}"
    );
    assert!(
        media
            .iter()
            .all(|name| !name.starts_with("library_") && !name.starts_with("playlist_") && !name.starts_with("stem_")),
        "{media:?}"
    );
}
