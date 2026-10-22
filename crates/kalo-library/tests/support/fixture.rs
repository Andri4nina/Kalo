use std::fs;
use std::path::PathBuf;

use kalo_database::{roots, Database};

use super::{temp_dir, wav_bytes};

/// A source folder with one WAV file and an empty library root.
pub struct ImportFixture {
    pub db: Database,
    pub root_id: i64,
    pub source: PathBuf,
    pub root_dir: PathBuf,
    pub dirs: Vec<PathBuf>,
}

pub fn import_fixture(name: &str) -> ImportFixture {
    let source_dir = temp_dir(&format!("{name}-src"));
    // Like `library_add_root`, roots are stored in canonical form.
    let root_dir =
        dunce::canonicalize(temp_dir(&format!("{name}-root"))).unwrap_or_else(|error| panic!("racine : {error}"));
    let cache = temp_dir(&format!("{name}-cache"));
    let source = source_dir.join("Morceau.wav");
    fs::write(&source, wav_bytes()).unwrap_or_else(|error| panic!("source : {error}"));
    let db = Database::in_memory().unwrap_or_else(|error| panic!("base : {error}"));
    let root_id = db
        .with(|conn| roots::add(conn, &root_dir.to_string_lossy()))
        .unwrap_or_else(|error| panic!("racine : {error}"))
        .id;
    ImportFixture {
        db,
        root_id,
        source,
        root_dir: root_dir.clone(),
        dirs: vec![source_dir, root_dir, cache],
    }
}

impl ImportFixture {
    pub fn cache(&self) -> &PathBuf {
        &self.dirs[2]
    }

    pub fn cleanup(self) {
        for directory in self.dirs {
            let _ = fs::remove_dir_all(directory);
        }
    }
}
