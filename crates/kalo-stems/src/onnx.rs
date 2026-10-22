//! Spleeter 4-stem engine on ONNX Runtime (CPU). Sessions live only for a job.

use ort::session::Session;
use ort::value::Tensor;

use crate::separator::Separator;
use crate::StemError;

mod load;

const SHAPE: [usize; 4] = [2, 1, 512, 1024];

pub struct OnnxSeparator {
    pub(crate) sessions: Vec<Session>,
}

pub(crate) fn engine(error: impl std::fmt::Display) -> StemError {
    StemError::Engine(error.to_string())
}

impl Separator for OnnxSeparator {
    fn estimate(&mut self, magnitudes: &[f32]) -> Result<[Vec<f32>; 4], StemError> {
        let mut estimates: [Vec<f32>; 4] = Default::default();
        for (slot, session) in estimates.iter_mut().zip(self.sessions.iter_mut()) {
            let input = Tensor::from_array((SHAPE, magnitudes.to_vec())).map_err(engine)?;
            let outputs = session.run(ort::inputs!["x" => input]).map_err(engine)?;
            let (_, values) = outputs["y"].try_extract_tensor::<f32>().map_err(engine)?;
            *slot = values.to_vec();
        }
        Ok(estimates)
    }
}
