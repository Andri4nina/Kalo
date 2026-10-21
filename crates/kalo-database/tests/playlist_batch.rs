mod support;

use kalo_database::playlists;

#[test]
fn batch_remove_renumbers_and_keeps_audio_rows() {
    let db = support::database();
    let root = support::add_root(&db);
    let first = support::insert(&db, root, "first.mp3");
    let second = support::insert(&db, root, "second.mp3");
    let third = support::insert(&db, root, "third.mp3");
    let playlist = db
        .with(|conn| playlists::create_playlist(conn, "Sélection"))
        .unwrap_or_else(|error| panic!("création : {error}"));
    for track_id in [first, second, third] {
        db.with(|conn| playlists::add_track(conn, playlist.id, track_id))
            .unwrap_or_else(|error| panic!("ajout : {error}"));
    }
    db.with(|conn| playlists::remove_tracks(conn, playlist.id, &[first, third]))
        .unwrap_or_else(|error| panic!("retrait groupé : {error}"));
    let remaining = db
        .with(|conn| playlists::list_tracks(conn, playlist.id))
        .unwrap_or_else(|error| panic!("relecture : {error}"));
    assert_eq!(remaining.iter().map(|track| track.id).collect::<Vec<_>>(), vec![second]);
    assert_eq!(support::count_tracks(&db), 3);
}
