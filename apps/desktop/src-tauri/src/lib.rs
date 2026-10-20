mod commands;
mod error;
mod setup;
mod state;

pub use error::CommandError;

pub fn run() -> tauri::Result<()> {
    tauri::Builder::default()
        .plugin(tauri_plugin_dialog::init())
        .setup(setup::init)
        .invoke_handler(tauri::generate_handler![
            commands::library::roots::library_roots,
            commands::library::roots::library_add_root,
            commands::library::roots::library_remove_root,
            commands::library::scan::library_scan,
            commands::library::catalog::library_tracks,
            commands::library::catalog::library_stats,
            commands::browse::list::library_artists,
            commands::browse::list::library_albums,
            commands::browse::detail::artist_get,
            commands::browse::detail::album_get,
            commands::browse::detail::artist_tracks,
            commands::browse::detail::album_tracks,
            commands::lyrics::track_lyrics,
            commands::data::data_backup,
            commands::data::data_restore,
            commands::listening::history::history_recent,
            commands::listening::history::history_record,
            commands::listening::favorites::favorites_toggle,
            commands::listening::favorites::favorites_list,
            commands::playlists::manage::playlist_list,
            commands::playlists::manage::playlist_create,
            commands::playlists::manage::playlist_rename,
            commands::playlists::manage::playlist_delete,
            commands::playlists::tracks::detail::playlist_detail,
            commands::playlists::tracks::mutate::playlist_add_track,
            commands::playlists::tracks::mutate::playlist_remove_track,
            commands::playlists::tracks::mutate::playlist_reorder,
        ])
        .run(tauri::generate_context!())
}
