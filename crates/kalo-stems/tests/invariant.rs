//! The four ratio masks sum to one, so the stems must rebuild the mix exactly
//! (the model author's check: about −153 dB in double precision).

use std::sync::atomic::AtomicBool;

use kalo_stems::separate;

mod support;

use support::{ratio_db, signal, Collect, FakeNet};

#[test]
fn stems_rebuild_the_mix_across_several_splits() {
    let length = 600_000; // more than one 512-frame split
    let mix = [signal(length, 0.0), signal(length, 1.0)];
    let mut sink = Collect::default();
    separate(
        [&mix[0], &mix[1]],
        &mut FakeNet,
        &mut sink,
        &AtomicBool::new(false),
        &|_, _| {},
    )
    .unwrap_or_else(|error| panic!("séparation : {error}"));
    let stems = &sink.0;
    for channel in 0..2 {
        let (mut error, mut reference, mut instrumental) = (0.0f64, 0.0f64, 0.0f64);
        for n in 0..length {
            let sum: f32 = (0..4).map(|stem| stems[stem][channel][n]).sum();
            let original = mix[channel][n];
            error += f64::from(sum - original).powi(2);
            reference += f64::from(original).powi(2);
            instrumental += f64::from(stems[4][channel][n] - (original - stems[0][channel][n])).powi(2);
        }
        assert!(stems.iter().all(|stem| stem[channel].len() == length));
        assert!(
            ratio_db(error, reference) < -100.0,
            "{:.1} dB",
            ratio_db(error, reference)
        );
        assert!(ratio_db(instrumental, reference) < -100.0);
    }
}
