mod support;

use kalo_database::downloads::{self, NewDownload};

fn new(root_id: i64, md5: Option<&'static str>) -> NewDownload<'static> {
    NewDownload {
        url: "https://archive.org/download/item/a.mp3",
        file_name: "a.mp3",
        provider: "archive",
        license: Some("https://creativecommons.org/licenses/by/4.0/"),
        expected_md5: md5,
        root_id,
    }
}

#[test]
fn downloads_progress_pause_on_restart_and_finish() {
    let db = support::database();
    let root = support::add_root(&db);
    assert!(db.with(|conn| downloads::create(conn, &new(9_999, None))).is_err());
    let id = db
        .with(|conn| downloads::create(conn, &new(root, Some("abc"))))
        .unwrap_or_else(|error| panic!("création : {error}"));
    let other = db
        .with(|conn| downloads::create(conn, &new(root, None)))
        .unwrap_or_else(|error| panic!("création : {error}"));
    db.with(|conn| downloads::progress(conn, id, 512, Some(1_024)))
        .unwrap_or_else(|error| panic!("progression : {error}"));
    assert_eq!(db.with(|conn| downloads::pause_interrupted(conn)).ok(), Some(2));
    let paused = db
        .with(|conn| downloads::get(conn, id))
        .unwrap_or_else(|error| panic!("lecture : {error}"));
    assert_eq!(
        (paused.status.as_str(), paused.received, paused.total),
        ("paused", 512, Some(1_024))
    );
    let md5 = db.with(|conn| downloads::expected_md5(conn, id)).ok();
    assert_eq!(md5.flatten().as_deref(), Some("abc"));
    db.with(|conn| downloads::set_status(conn, other, "failed", Some("réseau")))
        .unwrap_or_else(|error| panic!("statut : {error}"));
    let failed = db
        .with(|conn| downloads::get(conn, other))
        .unwrap_or_else(|error| panic!("lecture : {error}"));
    assert_eq!(failed.error.as_deref(), Some("réseau"));
    assert_eq!(db.with(|conn| downloads::delete(conn, id)).ok(), Some(true));
    let left = db
        .with(|conn| downloads::list(conn))
        .unwrap_or_else(|error| panic!("liste : {error}"));
    assert_eq!(left.len(), 1);
}
