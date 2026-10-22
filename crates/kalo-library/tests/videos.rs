use std::fs;
use std::path::Path;

use kalo_database::videos;
use kalo_library::{scan_root, target_path};

mod support;

use support::import_fixture;

#[test]
fn clips_are_indexed_apart_and_flagged_when_gone() {
    let fx = import_fixture("videos");
    let clip = fx.root_dir.join("Mon clip.webm");
    fs::write(&clip, b"pas un vrai webm").unwrap_or_else(|error| panic!("clip : {error}"));
    scan_root(&fx.db, fx.root_id, fx.cache(), |_| {}).unwrap_or_else(|error| panic!("analyse : {error}"));
    let list = |db: &kalo_database::Database| {
        db.with(|conn| videos::list(conn, None))
            .unwrap_or_else(|error| panic!("liste : {error}"))
    };
    let found = list(&fx.db);
    assert_eq!(found.len(), 1);
    assert_eq!(found[0].title, "Mon clip");
    assert_eq!(found[0].format, "WEBM");
    assert_eq!(support::track_count(&fx.db), 0, "un clip n'entre pas dans la musique");
    fs::remove_file(&clip).unwrap_or_else(|error| panic!("suppression : {error}"));
    scan_root(&fx.db, fx.root_id, fx.cache(), |_| {}).unwrap_or_else(|error| panic!("réanalyse : {error}"));
    assert!(list(&fx.db)[0].is_missing);
    fx.cleanup();
}

#[test]
fn clips_are_filed_in_a_video_folder() {
    let path = target_path(Path::new("D:/Music"), Some("Nina Rava"), "Live", "MP4");
    assert_eq!(
        path,
        Path::new("D:/Music").join("Nina Rava").join("video").join("Live.mp4")
    );
}
