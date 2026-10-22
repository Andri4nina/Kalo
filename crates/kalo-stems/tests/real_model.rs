//! End-to-end check with the real networks. Needs the network (79 MB) once:
//! `cargo test -p kalo-stems --test real_model -- --ignored`.

use std::path::PathBuf;
use std::sync::atomic::AtomicBool;

use kalo_stems::{models, run_job, OUTPUT_NAMES};

mod support;

fn wav_bytes(left: &[f32], right: &[f32]) -> Vec<u8> {
    let data = (left.len() * 4) as u32;
    let mut bytes = b"RIFF".to_vec();
    bytes.extend_from_slice(&(36 + data).to_le_bytes());
    bytes.extend_from_slice(b"WAVEfmt \x10\0\0\0\x01\0\x02\0\x44\xac\0\0\x10\xb1\x02\0\x04\0\x10\0data");
    bytes.extend_from_slice(&data.to_le_bytes());
    for (l, r) in left.iter().zip(right) {
        bytes.extend_from_slice(&((l * 32_767.0) as i16).to_le_bytes());
        bytes.extend_from_slice(&((r * 32_767.0) as i16).to_le_bytes());
    }
    bytes
}

#[test]
#[ignore = "télécharge le modèle (79 Mo)"]
fn real_networks_separate_and_rebuild_the_mix() {
    let root = PathBuf::from(env!("CARGO_TARGET_TMPDIR"));
    let model_dir = root.join("spleeter-model");
    models::install(&model_dir, &AtomicBool::new(false), &|_, _| {}).unwrap_or_else(|error| panic!("modèle : {error}"));
    assert!(models::is_installed(&model_dir));
    let length = 441_000;
    let (left, right) = (support::signal(length, 0.0), support::signal(length, 0.7));
    let input = root.join("mix.wav");
    std::fs::write(&input, wav_bytes(&left, &right)).unwrap_or_else(|error| panic!("entrée : {error}"));
    let out_dir = root.join("stems");
    let outputs = run_job(&input, &model_dir, &out_dir, &AtomicBool::new(false), &|_, _| {})
        .unwrap_or_else(|error| panic!("séparation : {error}"));
    assert_eq!(outputs.len(), OUTPUT_NAMES.len());
    for output in &outputs {
        let size = std::fs::metadata(output).map(|meta| meta.len()).unwrap_or(0);
        assert_eq!(size, 44 + length as u64 * 4, "{}", output.display());
    }
    assert!(!out_dir.join(".partial").exists());
}
