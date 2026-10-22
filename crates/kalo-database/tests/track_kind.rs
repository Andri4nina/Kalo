mod support;

use kalo_database::{tracks, Database};

fn ids(db: &Database, kind: Option<&str>) -> Vec<i64> {
    let mut query = support::query();
    query.kind = kind.map(str::to_owned);
    let mut ids: Vec<i64> = db
        .with(|conn| tracks::list(conn, &query))
        .unwrap_or_else(|error| panic!("liste : {error}"))
        .iter()
        .map(|track| track.id)
        .collect();
    ids.sort_unstable();
    ids
}

#[test]
fn short_sounds_and_system_folders_are_not_music() {
    let db = support::database();
    let root = support::add_root(&db);
    let song = support::insert(&db, root, "C:/KaloTests/Music/Album/chanson.mp3");
    let ringtone = support::insert(&db, root, "C:\\KaloTests\\Music\\Ringtones\\bip.mp3");
    let jingle = support::insert(&db, root, "C:/KaloTests/Music/Album/jingle.mp3");
    db.with(|conn| {
        Ok(conn.execute(
            "UPDATE tracks SET duration_ms = 200000 WHERE id IN (?1, ?2)",
            [song, ringtone],
        )?)
    })
    .unwrap_or_else(|error| panic!("durées : {error}"));
    assert_eq!(ids(&db, Some("music")), vec![song]);
    assert_eq!(ids(&db, Some("other")), vec![ringtone, jingle]);
    assert_eq!(ids(&db, None).len(), 3);
}
