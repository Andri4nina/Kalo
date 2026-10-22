use tauri::ipc::Invoke;
use tauri::Wry;

/// Commands named `playlist_*`.
pub(crate) fn handler() -> impl Fn(Invoke<Wry>) -> bool + Send + Sync + 'static {
    tauri::generate_handler![
        crate::commands::playlists::manage::playlist_list,
        crate::commands::playlists::manage::playlist_create,
        crate::commands::playlists::manage::playlist_rename,
        crate::commands::playlists::manage::playlist_duplicate,
        crate::commands::playlists::manage::playlist_delete,
        crate::commands::playlists::details::playlist_update_details,
        crate::commands::playlists::details::playlist_set_cover,
        crate::commands::playlists::tracks::detail::playlist_detail,
        crate::commands::playlists::tracks::mutate::playlist_add_track,
        crate::commands::playlists::tracks::mutate::playlist_remove_track,
        crate::commands::playlists::tracks::mutate::playlist_remove_tracks,
        crate::commands::playlists::tracks::mutate::playlist_reorder,
        crate::commands::playlists::m3u_export::playlist_export_m3u,
        crate::commands::playlists::m3u_import::playlist_import_m3u,
    ]
}
