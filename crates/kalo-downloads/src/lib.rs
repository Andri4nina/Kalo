//! Downloads from sources that allow them: direct links the user is entitled
//! to, and freely licensed works of the Internet Archive. No DRM or terms of
//! service are bypassed; downloaded content is never executed.

mod error;
mod http;
pub mod providers;
mod url;
mod verify;

pub use error::DownloadError;
pub use http::{fetch, Control, MAX_BYTES};
pub use url::{file_name, validate};
pub use verify::check_md5;
