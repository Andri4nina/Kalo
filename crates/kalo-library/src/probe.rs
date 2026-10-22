use std::path::Path;

use lofty::file::AudioFile;

use crate::extensions;

/// True when `path` has a supported audio extension and really decodes as
/// audio with a duration (a downloaded web page renamed `.mp3` is refused).
pub fn is_playable_audio(path: &Path) -> bool {
    extensions::is_supported(path)
        && lofty::read_from_path(path)
            .map(|file| file.properties().duration().as_millis() > 0)
            .unwrap_or(false)
}
