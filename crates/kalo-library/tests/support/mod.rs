use std::fs;
use std::path::PathBuf;

pub fn temp_dir(name: &str) -> PathBuf {
    let path = std::env::temp_dir().join(format!("kalo-{name}-{}", std::process::id()));
    fs::create_dir_all(&path).unwrap_or_else(|error| panic!("dossier temporaire : {error}"));
    path
}

pub fn wav_bytes() -> Vec<u8> {
    let samples: u32 = 800;
    let data_len = samples * 2;
    let mut bytes = Vec::new();
    bytes.extend_from_slice(b"RIFF");
    bytes.extend_from_slice(&(36 + data_len).to_le_bytes());
    bytes.extend_from_slice(b"WAVEfmt ");
    bytes.extend_from_slice(&16u32.to_le_bytes());
    bytes.extend_from_slice(&1u16.to_le_bytes());
    bytes.extend_from_slice(&1u16.to_le_bytes());
    bytes.extend_from_slice(&8000u32.to_le_bytes());
    bytes.extend_from_slice(&16000u32.to_le_bytes());
    bytes.extend_from_slice(&2u16.to_le_bytes());
    bytes.extend_from_slice(&16u16.to_le_bytes());
    bytes.extend_from_slice(b"data");
    bytes.extend_from_slice(&data_len.to_le_bytes());
    bytes.resize(bytes.len() + data_len as usize, 0);
    bytes
}
