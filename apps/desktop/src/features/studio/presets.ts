export interface Preset {
  id: string;
  label: string;
  gains: number[];
}

export const PRESETS: Preset[] = [
  { id: "flat", label: "Plat", gains: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0] },
  { id: "bass", label: "Graves", gains: [6, 5, 4, 2, 0, 0, -1, -1, 0, 0] },
  { id: "voice", label: "Voix", gains: [-2, -1, 0, 2, 4, 4, 3, 1, 0, -1] },
  { id: "rock", label: "Rock", gains: [5, 4, 2, -1, -2, 0, 2, 3, 4, 3] },
  { id: "podcast", label: "Podcast", gains: [-6, -4, -1, 2, 4, 3, 1, 0, -1, -2] },
];
