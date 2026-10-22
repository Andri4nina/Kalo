use tauri::ipc::Invoke;
use tauri::Wry;

/// Commands named `download_*`: authorised sources, transfers and their control.
pub(crate) fn handler() -> impl Fn(Invoke<Wry>) -> bool + Send + Sync + 'static {
    tauri::generate_handler![
        crate::commands::downloads::start::download_start,
        crate::commands::downloads::control::download_list,
        crate::commands::downloads::control::download_pause,
        crate::commands::downloads::control::download_resume,
        crate::commands::downloads::discard::download_cancel,
        crate::commands::downloads::discard::download_remove,
        crate::commands::downloads::search::download_search,
        crate::commands::downloads::search::download_files,
    ]
}
