use tauri::ipc::Invoke;
use tauri::Wry;

/// Browsing details, lyrics, listening history, favorites and data backups.
pub(crate) fn handler() -> impl Fn(Invoke<Wry>) -> bool + Send + Sync + 'static {
    tauri::generate_handler![
        crate::commands::browse::detail::artist_get,
        crate::commands::browse::detail::album_get,
        crate::commands::browse::detail::artist_tracks,
        crate::commands::browse::detail::album_tracks,
        crate::commands::lyrics::read::track_lyrics,
        crate::commands::lyrics::edit::lyrics_save,
        crate::commands::lyrics::edit::lyrics_reset,
        crate::commands::lyrics::export::lyrics_export,
        crate::commands::data::data_backup,
        crate::commands::data::data_restore,
        crate::commands::listening::history::history_recent,
        crate::commands::listening::history::history_record,
        crate::commands::listening::favorites::favorites_toggle,
        crate::commands::listening::favorites::favorites_list,
    ]
}
