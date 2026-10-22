use kalo_downloads::providers::{parse_files, parse_items};
use serde_json::json;

#[test]
fn search_keeps_only_licensed_works() {
    let response = json!({ "response": { "docs": [
        { "identifier": "free", "title": "Libre", "creator": ["A", "B"], "licenseurl": "https://creativecommons.org/licenses/by/4.0/" },
        { "identifier": "unknown", "title": "Sans licence" }
    ] } });
    let items = parse_items(&response);
    assert_eq!(items.len(), 1);
    assert_eq!(items[0].id, "free");
    assert_eq!(items[0].creator.as_deref(), Some("A"));
}

#[test]
fn files_keep_audio_with_checksum_and_encoded_url() {
    let metadata = json!({ "files": [
        { "name": "Disque 1/01 Ouverture.mp3", "format": "VBR MP3", "size": "1234", "md5": "abc" },
        { "name": "cover.jpg", "format": "JPEG" },
        { "name": "item_meta.xml", "format": "Metadata" }
    ] });
    let files = parse_files("mon item", &metadata);
    assert_eq!(files.len(), 1);
    assert_eq!(
        files[0].url,
        "https://archive.org/download/mon%20item/Disque%201/01%20Ouverture.mp3"
    );
    assert_eq!((files[0].size, files[0].md5.as_deref()), (Some(1234), Some("abc")));
}
