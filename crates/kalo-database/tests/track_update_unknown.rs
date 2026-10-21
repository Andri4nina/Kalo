use kalo_database::{tracks, Database};

mod support;

#[test]
fn metadata_update_reports_unknown_track() {
    let db = Database::in_memory().unwrap_or_else(|error| panic!("base : {error}"));
    let changed = db
        .with(|conn| tracks::update(conn, 999, "Titre", "Artiste", None, None, None))
        .unwrap_or_else(|error| panic!("mise à jour : {error}"));
    assert!(!changed);
}
