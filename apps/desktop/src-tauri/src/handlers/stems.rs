use tauri::ipc::Invoke;
use tauri::Wry;

/// Commands named `stem_*`: local model, separation jobs, exports.
pub(crate) fn handler() -> impl Fn(Invoke<Wry>) -> bool + Send + Sync + 'static {
    tauri::generate_handler![
        crate::commands::stems::model::stem_model_status,
        crate::commands::stems::model::stem_model_install,
        crate::commands::stems::control::stem_model_uninstall,
        crate::commands::stems::control::stem_cancel,
        crate::commands::stems::start::stem_start,
        crate::commands::stems::jobs::stem_jobs,
        crate::commands::stems::jobs::stem_delete,
        crate::commands::stems::export::stem_export,
    ]
}
