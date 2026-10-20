/// Builds a SQL `LIKE` pattern that matches the searched text literally.
pub fn pattern(search: Option<&str>) -> Option<String> {
    search.map(str::trim).filter(|value| !value.is_empty()).map(|value| {
        let escaped = value.replace('\\', "\\\\").replace('%', "\\%").replace('_', "\\_");
        format!("%{escaped}%")
    })
}
