use std::fs;
use std::path::PathBuf;

use kalo_database::Database;

fn db_path(name: &str) -> PathBuf {
    std::env::temp_dir().join(format!("kalo-{name}-{}.db", std::process::id()))
}

#[test]
fn file_database_enables_wal_and_runs_migrations() {
    let path = db_path("wal");
    let db = Database::open(&path).unwrap_or_else(|error| panic!("base : {error}"));
    let mode: String = db
        .with(|conn| Ok(conn.pragma_query_value(None, "journal_mode", |row| row.get(0))?))
        .unwrap_or_else(|error| panic!("pragma : {error}"));
    assert_eq!(mode.to_lowercase(), "wal");
    let version: i64 = db
        .with(|conn| Ok(conn.pragma_query_value(None, "user_version", |row| row.get(0))?))
        .unwrap_or_else(|error| panic!("version : {error}"));
    assert_eq!(version, 9);
    drop(db);
    for suffix in ["", "-wal", "-shm", "-journal"] {
        let _ = fs::remove_file(format!("{}{suffix}", path.display()));
    }
}
