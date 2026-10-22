use realfft::RealFftPlanner;

use super::super::window::{periodic_hann, N_FFT};
use super::OverlapAdd;

impl OverlapAdd {
    pub fn new() -> Self {
        let ifft = RealFftPlanner::<f32>::new().plan_fft_inverse(N_FFT);
        let (scratch, buffer) = (ifft.make_scratch_vec(), ifft.make_input_vec());
        let window = periodic_hann();
        let (sum, weight, frame) = (Vec::new(), Vec::new(), vec![0.0; N_FFT]);
        Self {
            ifft,
            window,
            buffer,
            frame,
            scratch,
            sum,
            weight,
            base: 0,
        }
    }
}

impl Default for OverlapAdd {
    fn default() -> Self {
        Self::new()
    }
}
