use kalo_downloads::{file_name, validate};

#[test]
fn only_plain_http_links_are_accepted() {
    assert!(validate("https://archive.org/download/x/a.mp3").is_ok());
    assert!(validate("http://example.org/a.flac").is_ok());
    assert!(validate("file:///C:/Windows/win.ini").is_err());
    assert!(validate("ftp://example.org/a.mp3").is_err());
    assert!(validate("https://user:secret@example.org/a.mp3").is_err());
    assert!(validate("https:///a.mp3").is_err());
    assert!(validate("https://example.org/a b.mp3").is_err());
}

#[test]
fn file_names_are_decoded_from_the_link() {
    assert_eq!(
        file_name("https://x.org/d/Ma%20chanson%C3%A9.mp3?token=1"),
        "Ma chansoné.mp3"
    );
    assert_eq!(file_name("https://x.org/"), "telechargement");
}
