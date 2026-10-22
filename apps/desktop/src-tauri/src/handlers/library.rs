use tauri::ipc::Invoke;
use tauri::Wry;

/// Commands named `library_*`: roots, scan, catalog, maintenance, browsing lists.
pub(crate) fn handler() -> impl Fn(Invoke<Wry>) -> bool + Send + Sync + 'static {
    tauri::generate_handler![
        crate::commands::library::roots::library_roots,
        crate::commands::library::roots::library_add_root,
        crate::commands::library::roots::library_remove_root,
        crate::commands::library::scan::library_scan,
        crate::commands::library::catalog::library_tracks,
        crate::commands::library::catalog::library_stats,
        crate::commands::library::catalog::library_formats,
        crate::commands::library::update::library_update_track,
        crate::commands::library::cover::library_set_cover,
        crate::commands::library::remove::library_remove_track,
        crate::commands::library::duplicates::library_duplicates,
        crate::commands::library::fingerprint::library_fingerprint,
        crate::commands::library::fingerprint::library_content_duplicates,
        crate::commands::library::import_files::library_import_files,
        crate::commands::library::watch::library_watch_set,
        crate::commands::library::relocate::library_relocate_track,
        crate::commands::library::export::library_export_wav,
        crate::commands::browse::list::library_artists,
        crate::commands::browse::list::library_albums,
    ]
}
