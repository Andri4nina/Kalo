-- Sons non musicaux probables : très courts ou rangés dans un dossier système
-- de sonneries, notifications, alarmes ou enregistrements vocaux. Colonne
-- calculée (jamais stockée) : la règle reste à un seul endroit.
ALTER TABLE tracks ADD COLUMN non_music INTEGER GENERATED ALWAYS AS (
    (duration_ms > 0 AND duration_ms < 45000)
    OR replace(lower(path), '\', '/') LIKE '%/ringtones/%'
    OR replace(lower(path), '\', '/') LIKE '%/sonneries/%'
    OR replace(lower(path), '\', '/') LIKE '%/notifications/%'
    OR replace(lower(path), '\', '/') LIKE '%/alarms/%'
    OR replace(lower(path), '\', '/') LIKE '%/alarmes/%'
    OR replace(lower(path), '\', '/') LIKE '%/recordings/%'
    OR replace(lower(path), '\', '/') LIKE '%/enregistrements/%'
    OR replace(lower(path), '\', '/') LIKE '%/voice recorder/%'
    OR replace(lower(path), '\', '/') LIKE '%/dictaphone/%'
) VIRTUAL;
