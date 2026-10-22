use kalo_core::RemoteItem;
use serde_json::Value;

pub(super) fn text(value: &Value) -> Option<String> {
    match value {
        Value::String(text) => Some(text.clone()),
        Value::Array(items) => items.first().and_then(text),
        _ => None,
    }
}

/// Search results; works without an explicit free licence are skipped.
pub fn parse_items(json: &Value) -> Vec<RemoteItem> {
    let docs = json
        .pointer("/response/docs")
        .and_then(Value::as_array)
        .cloned()
        .unwrap_or_default();
    docs.iter()
        .filter_map(|doc| {
            let license = text(&doc["licenseurl"])?;
            Some(RemoteItem {
                provider: "archive".into(),
                id: text(&doc["identifier"])?,
                title: text(&doc["title"]).unwrap_or_else(|| "Sans titre".into()),
                creator: text(&doc["creator"]),
                license,
            })
        })
        .collect()
}
