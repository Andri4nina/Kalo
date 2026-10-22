use super::super::window::PAD;
use super::OverlapAdd;

impl OverlapAdd {
    /// Releases every remaining sample (end of stream).
    pub fn finish(&mut self, output: &mut Vec<f32>) {
        let all = self.sum.len();
        self.release(all, output);
    }

    /// Normalises and hands out the first `until` buffered samples, skipping
    /// the front padding.
    pub(super) fn release(&mut self, until: usize, output: &mut Vec<f32>) {
        for position in 0..until {
            if self.base + position >= PAD {
                let weight = self.weight[position];
                output.push(if weight > 1e-8 {
                    self.sum[position] / weight
                } else {
                    0.0
                });
            }
        }
        self.sum.drain(..until);
        self.weight.drain(..until);
        self.base += until;
    }
}
