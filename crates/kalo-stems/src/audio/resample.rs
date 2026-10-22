use std::f64::consts::PI;

/// Rate expected by the Spleeter networks.
pub const MODEL_RATE: u32 = 44_100;

/// Lobes of the Lanczos kernel on each side.
const LOBES: f64 = 16.0;

fn sinc(x: f64) -> f64 {
    if x.abs() < 1e-9 {
        1.0
    } else {
        (PI * x).sin() / (PI * x)
    }
}

/// Windowed-sinc (Lanczos) resampling of one channel from `from` Hz to `to`
/// Hz, low-passed at the lower Nyquist frequency to avoid aliasing.
pub fn resample(signal: &[f32], from: u32, to: u32) -> Vec<f32> {
    if from == to || signal.is_empty() {
        return signal.to_vec();
    }
    let step = f64::from(from) / f64::from(to);
    let cutoff = (1.0 / step).min(1.0);
    let reach = (LOBES / cutoff).ceil() as i64;
    let length = (signal.len() as f64 / step).floor() as usize;
    (0..length)
        .map(|index| {
            let center = index as f64 * step;
            let base = center.floor() as i64;
            let (mut sum, mut weight) = (0.0f64, 0.0f64);
            for tap in (base - reach + 1)..=(base + reach) {
                let Some(sample) = usize::try_from(tap).ok().and_then(|at| signal.get(at)) else {
                    continue;
                };
                let distance = (center - tap as f64) * cutoff;
                let kernel = sinc(distance) * sinc(distance / LOBES);
                sum += f64::from(*sample) * kernel;
                weight += kernel;
            }
            if weight.abs() > 1e-12 {
                (sum / weight) as f32
            } else {
                0.0
            }
        })
        .collect()
}
