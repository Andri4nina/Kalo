mod support;

use kalo_database::{lyrics, tracks};

#[test]
fn edited_lyrics_are_saved_replaced_and_reset() {
    let db = support::database();
    let root = support::add_root(&db);
    let track = support::insert(&db, root, "C:/KaloTests/Music/chanson.mp3");
    let get = || {
        db.with(|conn| lyrics::get(conn, track))
            .unwrap_or_else(|error| panic!("lecture : {error}"))
    };
    assert_eq!(get(), None);
    db.with(|conn| lyrics::save(conn, track, "[00:01.00]Bonjour"))
        .unwrap_or_else(|error| panic!("enregistrement : {error}"));
    db.with(|conn| lyrics::save(conn, track, "[00:02.00]Bonsoir"))
        .unwrap_or_else(|error| panic!("remplacement : {error}"));
    assert_eq!(get().as_deref(), Some("[00:02.00]Bonsoir"));
    assert!(db.with(|conn| lyrics::save(conn, track, "   ")).is_err());
    assert!(db.with(|conn| lyrics::save(conn, 9_999, "texte")).is_err());
    let reset = db
        .with(|conn| lyrics::reset(conn, track))
        .unwrap_or_else(|error| panic!("reset : {error}"));
    assert!(reset);
    assert_eq!(get(), None);
}

#[test]
fn removing_a_track_removes_its_edited_lyrics() {
    let db = support::database();
    let root = support::add_root(&db);
    let track = support::insert(&db, root, "C:/KaloTests/Music/chanson.mp3");
    db.with(|conn| lyrics::save(conn, track, "[00:01.00]Bonjour"))
        .unwrap_or_else(|error| panic!("enregistrement : {error}"));
    db.with(|conn| tracks::remove(conn, track))
        .unwrap_or_else(|error| panic!("retrait : {error}"));
    let left = db
        .with(|conn| lyrics::get(conn, track))
        .unwrap_or_else(|error| panic!("lecture : {error}"));
    assert_eq!(left, None);
}
