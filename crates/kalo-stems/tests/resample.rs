use kalo_stems::{resample, MODEL_RATE};

fn sine(rate: u32, hz: f32, seconds: f32) -> Vec<f32> {
    let count = (rate as f32 * seconds) as usize;
    (0..count)
        .map(|n| (2.0 * std::f32::consts::PI * hz * n as f32 / rate as f32).sin() * 0.5)
        .collect()
}

#[test]
fn a_48_khz_sine_keeps_its_pitch_at_44_1_khz() {
    let resampled = resample(&sine(48_000, 1_000.0, 1.0), 48_000, MODEL_RATE);
    let expected = sine(MODEL_RATE, 1_000.0, 1.0);
    assert!((resampled.len() as i64 - expected.len() as i64).abs() <= 1);
    let (mut error, mut reference) = (0.0f64, 0.0f64);
    for (got, want) in resampled.iter().zip(&expected).skip(500).take(40_000) {
        error += f64::from(got - want).powi(2);
        reference += f64::from(*want).powi(2);
    }
    assert!(10.0 * (error / reference).log10() < -60.0);
}

#[test]
fn same_rate_is_untouched() {
    let signal = sine(MODEL_RATE, 440.0, 0.1);
    assert_eq!(resample(&signal, MODEL_RATE, MODEL_RATE), signal);
}
