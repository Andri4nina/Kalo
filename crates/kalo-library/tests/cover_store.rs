use std::fs;
use std::path::PathBuf;

use kalo_library::store_cover;

#[test]
fn stores_an_image_in_the_cache_with_a_content_hash() {
    let cache = std::env::temp_dir().join(format!("kalo-cover-{}", std::process::id()));
    let _ = fs::remove_dir_all(&cache);
    let data = [0x89, b'P', b'N', b'G', 0x0D, 0x0A, 0x1A, 0x0A, 1, 2, 3];
    let stored = store_cover(&cache, &data, None).unwrap_or_else(|| panic!("pochette non stockée"));
    let path = PathBuf::from(&stored);
    assert_eq!(path.extension().and_then(|value| value.to_str()), Some("png"));
    let written = fs::read(&path).unwrap_or_else(|error| panic!("lecture : {error}"));
    assert_eq!(written, data);
    let _ = fs::remove_dir_all(&cache);
}

#[test]
fn rejects_unknown_image_data() {
    let cache = std::env::temp_dir().join(format!("kalo-cover-bad-{}", std::process::id()));
    assert!(store_cover(&cache, b"not an image", None).is_none());
    let _ = fs::remove_dir_all(&cache);
}
