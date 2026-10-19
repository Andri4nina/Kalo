mod support;

use kalo_database::playlists;

#[test]
fn playlist_lifecycle_keeps_audio_rows() {
    let db = support::database();
    let root = support::add_root(&db);
    let first = support::insert(&db, root, "first.mp3");
    let second = support::insert(&db, root, "second.mp3");
    let playlist = db
        .with(|conn| playlists::create_playlist(conn, "Soirée"))
        .unwrap_or_else(|error| panic!("création : {error}"));
    db.with(|conn| playlists::add_track(conn, playlist.id, first))
        .unwrap_or_else(|error| panic!("ajout : {error}"));
    db.with(|conn| playlists::add_track(conn, playlist.id, second))
        .unwrap_or_else(|error| panic!("ajout : {error}"));
    db.with(|conn| playlists::add_track(conn, playlist.id, first))
        .unwrap_or_else(|error| panic!("doublon : {error}"));
    let detail = db
        .with(|conn| {
            let playlist = playlists::get_playlist(conn, playlist.id)?;
            let tracks = playlists::list_tracks(conn, playlist.id)?;
            Ok(kalo_core::PlaylistDetail { playlist, tracks })
        })
        .unwrap_or_else(|error| panic!("détail : {error}"));
    assert_eq!(detail.tracks.len(), 2);
    assert_eq!(detail.playlist.track_count, 2);
    db.with(|conn| playlists::reorder_playlist(conn, playlist.id, &[second, first]))
        .unwrap_or_else(|error| panic!("réordonnancement : {error}"));
    let reordered = db
        .with(|conn| playlists::list_tracks(conn, playlist.id))
        .unwrap_or_else(|error| panic!("ordre : {error}"));
    assert_eq!(reordered.first().map(|track| track.id), Some(second));
    db.with(|conn| playlists::delete_playlist(conn, playlist.id))
        .unwrap_or_else(|error| panic!("suppression : {error}"));
    let remaining = db
        .with(|conn| playlists::list_playlists(conn))
        .unwrap_or_else(|error| panic!("liste : {error}"));
    assert!(remaining.is_empty());
    assert_eq!(support::count_tracks(&db), 2);
}
