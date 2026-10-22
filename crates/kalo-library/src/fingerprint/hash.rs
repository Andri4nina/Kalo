use std::fs::File;
use std::io::Read;
use std::path::Path;

const CHUNK: usize = 256 * 1024;

/// BLAKE3 of a file, read in chunks so large files never sit in memory.
pub fn hash_file(path: &Path) -> std::io::Result<String> {
    let mut file = File::open(path)?;
    let mut hasher = blake3::Hasher::new();
    let mut buffer = vec![0u8; CHUNK];
    loop {
        let read = file.read(&mut buffer)?;
        if read == 0 {
            break;
        }
        hasher.update(&buffer[..read]);
    }
    Ok(hasher.finalize().to_hex().to_string())
}
