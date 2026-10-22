mod support;

use kalo_database::stems;

#[test]
fn jobs_are_tracked_finished_listed_and_deleted() {
    let db = support::database();
    let root = support::add_root(&db);
    let track = support::insert(&db, root, "C:/KaloTests/Music/chanson.mp3");
    assert!(db.with(|conn| stems::create(conn, 9_999)).is_err());
    let job = db
        .with(|conn| stems::create(conn, track))
        .unwrap_or_else(|error| panic!("création : {error}"));
    let interrupted = db
        .with(|conn| stems::create(conn, track))
        .unwrap_or_else(|error| panic!("création : {error}"));
    db.with(|conn| stems::finish(conn, job, "done", None, Some("C:/data/stems/1")))
        .unwrap_or_else(|error| panic!("fin : {error}"));
    assert_eq!(db.with(|conn| stems::mark_interrupted(conn)).ok(), Some(1));
    let jobs = db
        .with(|conn| stems::list(conn))
        .unwrap_or_else(|error| panic!("liste : {error}"));
    assert_eq!(jobs.len(), 2);
    let done = db
        .with(|conn| stems::get(conn, job))
        .unwrap_or_else(|error| panic!("lecture : {error}"));
    assert_eq!(
        (done.status.as_str(), done.title.as_str()),
        ("done", "C:/KaloTests/Music/chanson.mp3")
    );
    let failed = db
        .with(|conn| stems::get(conn, interrupted))
        .unwrap_or_else(|error| panic!("lecture : {error}"));
    assert_eq!(failed.status, "failed");
    let folder = db
        .with(|conn| stems::delete(conn, job))
        .unwrap_or_else(|error| panic!("suppression : {error}"));
    assert_eq!(folder.as_deref(), Some("C:/data/stems/1"));
    assert!(db.with(|conn| stems::get(conn, job)).is_err());
}
