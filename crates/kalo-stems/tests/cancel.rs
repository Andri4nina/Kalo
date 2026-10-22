use std::sync::atomic::AtomicBool;

use kalo_stems::{separate, StemError};

mod support;

use support::{signal, Collect, FakeNet};

#[test]
fn cancellation_stops_before_any_work() {
    let mix = [signal(10_000, 0.0), signal(10_000, 0.5)];
    let result = separate(
        [&mix[0], &mix[1]],
        &mut FakeNet,
        &mut Collect::default(),
        &AtomicBool::new(true),
        &|_, _| {},
    );
    assert!(matches!(result, Err(StemError::Cancelled)));
}
