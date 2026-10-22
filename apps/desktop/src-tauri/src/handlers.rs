use tauri::ipc::Invoke;
use tauri::Wry;

mod library;
mod media;
mod playlists;
mod stems;

/// IPC registry split by domain: each command name starts with its domain
/// prefix (`library_`, `playlist_`, `stem_`), the rest goes to the media registry.
pub(crate) fn handler() -> impl Fn(Invoke<Wry>) -> bool + Send + Sync + 'static {
    let library = library::handler();
    let playlists = playlists::handler();
    let media = media::handler();
    let stems = stems::handler();
    move |invoke| {
        let name = invoke.message.command();
        if name.starts_with("library_") {
            library(invoke)
        } else if name.starts_with("playlist_") {
            playlists(invoke)
        } else if name.starts_with("stem_") {
            stems(invoke)
        } else {
            media(invoke)
        }
    }
}
