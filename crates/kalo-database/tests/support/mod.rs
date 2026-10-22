#![allow(dead_code)]

mod data;
mod filtered;
mod new_track;
mod query;

#[allow(unused_imports)]
pub use data::{count_tracks, insert, insert_with};
#[allow(unused_imports)]
pub use filtered::filtered_database;
#[allow(unused_imports)]
pub use new_track::new_track;
#[allow(unused_imports)]
pub use query::{metadata_row, query};

use std::fs;
use std::path::{Path, PathBuf};

use kalo_database::{roots, Database};

pub fn database() -> Database {
    match Database::in_memory() {
        Ok(db) => db,
        Err(error) => panic!("base en mémoire indisponible : {error}"),
    }
}

pub fn add_root(db: &Database) -> i64 {
    db.with(|conn| roots::add(conn, "C:/KaloTests/Music"))
        .map(|root| root.id)
        .unwrap_or_else(|error| panic!("dossier de test : {error}"))
}

pub fn temp_db(name: &str) -> PathBuf {
    std::env::temp_dir().join(format!("kalo-{name}-{}.db", std::process::id()))
}

pub fn cleanup(path: &Path) {
    for suffix in ["", "-wal", "-shm", "-journal"] {
        let _ = fs::remove_file(format!("{}{suffix}", path.display()));
    }
}
