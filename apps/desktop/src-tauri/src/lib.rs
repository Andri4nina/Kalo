mod commands;
mod error;
mod handlers;
mod setup;
mod state;
pub use error::CommandError;

pub fn run() -> tauri::Result<()> {
    tauri::Builder::default()
        .plugin(tauri_plugin_dialog::init())
        .setup(setup::init)
        .invoke_handler(handlers::handler())
        .run(tauri::generate_context!())
}
