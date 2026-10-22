use tauri::ipc::Invoke;
use tauri::Wry;

mod library;
mod media;
mod playlists;

/// IPC registry split by domain: each command name starts with its domain
/// prefix (`library_`, `playlist_`), the rest goes to the media registry.
pub(crate) fn handler() -> impl Fn(Invoke<Wry>) -> bool + Send + Sync + 'static {
    let library = library::handler();
    let playlists = playlists::handler();
    let media = media::handler();
    move |invoke| {
        let name = invoke.message.command();
        if name.starts_with("library_") {
            library(invoke)
        } else if name.starts_with("playlist_") {
            playlists(invoke)
        } else {
            media(invoke)
        }
    }
}
