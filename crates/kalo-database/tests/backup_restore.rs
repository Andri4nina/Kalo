mod support;

use kalo_database::{backup, playlists, restore};

#[test]
fn backup_and_restore_preserve_tracks_and_playlists() {
    let db = support::database();
    let root = support::add_root(&db);
    let track = support::insert(&db, root, "backup.mp3");
    let playlist = db
        .with(|conn| playlists::create_playlist(conn, "Voyage"))
        .unwrap_or_else(|error| panic!("playlist : {error}"));
    db.with(|conn| playlists::add_track(conn, playlist.id, track))
        .unwrap_or_else(|error| panic!("ajout : {error}"));
    let file = support::temp_db("backup-roundtrip");
    support::cleanup(&file);
    db.with(|conn| backup::to_file(conn, &file))
        .unwrap_or_else(|error| panic!("sauvegarde : {error}"));
    let restored = support::database();
    restored
        .with(|conn| restore::from_file(conn, &file))
        .unwrap_or_else(|error| panic!("restauration : {error}"));
    assert_eq!(support::count_tracks(&restored), 1);
    let restored_playlists = restored
        .with(|conn| playlists::list_playlists(conn))
        .unwrap_or_else(|error| panic!("playlists : {error}"));
    assert_eq!(restored_playlists.len(), 1);
    let restored_tracks = restored
        .with(|conn| playlists::list_tracks(conn, restored_playlists[0].id))
        .unwrap_or_else(|error| panic!("morceaux : {error}"));
    assert_eq!(restored_tracks.len(), 1);
    support::cleanup(&file);
}
