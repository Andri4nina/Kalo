pub fn clause(sort: &str) -> &'static str {
    match sort {
        "title" => "ORDER BY t.title COLLATE NOCASE, t.id",
        "artist" => "ORDER BY a.name COLLATE NOCASE, al.title COLLATE NOCASE, t.track_no, t.title",
        "album" => "ORDER BY al.title COLLATE NOCASE, t.track_no, t.title",
        "duration" => "ORDER BY t.duration_ms DESC, t.title",
        "year" => "ORDER BY t.year DESC, t.title COLLATE NOCASE",
        _ => "ORDER BY t.added_at DESC, t.id DESC",
    }
}
