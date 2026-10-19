use kalo_core::NewTrack;
use kalo_database::{tracks, Database};

use crate::LibraryError;

#[derive(Default)]
pub struct Outcome {
    pub imported: i64,
    pub updated: i64,
}

/// Persists one batch atomically. A failure keeps the previous batch intact.
pub fn flush(db: &Database, pending: &mut Vec<NewTrack>) -> Result<Outcome, LibraryError> {
    if pending.is_empty() {
        return Ok(Outcome::default());
    }
    let mut outcome = Outcome::default();
    db.with(|conn| {
        let tx = conn.transaction()?;
        for track in pending.iter() {
            let (_, inserted) = tracks::upsert(&tx, track)?;
            if inserted {
                outcome.imported += 1;
            } else {
                outcome.updated += 1;
            }
        }
        tx.commit()?;
        Ok(())
    })?;
    pending.clear();
    Ok(outcome)
}
