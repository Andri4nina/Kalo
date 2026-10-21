import type { TrackFilters } from "./useTrackPage";
import type { FilterValue } from "./LibraryFilters";

export function toTrackFilters(value: FilterValue): TrackFilters {
  return {
    format: value.format === "all" ? null : value.format,
    availability: value.availability === "all" ? null : value.availability,
    minDurationMs: value.duration === "medium" ? 120_000 : value.duration === "long" ? 300_001 : null,
    maxDurationMs: value.duration === "short" ? 119_999 : value.duration === "medium" ? 300_000 : null,
  };
}