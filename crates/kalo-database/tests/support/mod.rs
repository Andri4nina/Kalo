#![allow(dead_code)]

mod data;

#[allow(unused_imports)]
pub use data::{count_tracks, insert};

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
