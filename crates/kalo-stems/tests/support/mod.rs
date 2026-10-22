#![allow(dead_code)]

use kalo_stems::{Separator, StemError, StemSink, SPLIT_VALUES};

/// Deterministic stand-in for the network: arbitrary positive estimates.
pub struct FakeNet;

impl Separator for FakeNet {
    fn estimate(&mut self, magnitudes: &[f32]) -> Result<[Vec<f32>; 4], StemError> {
        assert_eq!(magnitudes.len(), SPLIT_VALUES);
        Ok([1.0f32, 2.0, 3.0, 4.0].map(|seed| {
            magnitudes
                .iter()
                .enumerate()
                .map(|(index, value)| value * (seed + (index % 7) as f32 * 0.3))
                .collect()
        }))
    }
}

/// Keeps every output in memory: `[output][channel]`.
#[derive(Default)]
pub struct Collect(pub [[Vec<f32>; 2]; 5]);

impl StemSink for Collect {
    fn write(&mut self, output: usize, left: &[f32], right: &[f32]) -> Result<(), StemError> {
        self.0[output][0].extend_from_slice(left);
        self.0[output][1].extend_from_slice(right);
        Ok(())
    }
}

/// Two sines (220 Hz with a phase, 3.52 kHz) at 44.1 kHz.
pub fn signal(length: usize, phase: f32) -> Vec<f32> {
    use std::f32::consts::PI;
    (0..length)
        .map(|n| {
            let t = n as f32 / 44_100.0;
            0.4 * (2.0 * PI * 220.0 * t + phase).sin() + 0.2 * (2.0 * PI * 3_520.0 * t).sin()
        })
        .collect()
}

pub fn ratio_db(error: f64, reference: f64) -> f64 {
    10.0 * (error / reference).log10()
}
