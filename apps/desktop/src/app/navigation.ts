import { Captions, Copy, Disc3, Heart, Home, Library, Mic2, Settings, SlidersHorizontal, type LucideIcon } from "lucide-react";

export interface NavItem {
  to: string;
  label: string;
  icon: LucideIcon;
  end?: boolean;
}

/** Écoute : panneau supérieur de la barre latérale. */
export const primaryNav: NavItem[] = [
  { to: "/", label: "Accueil", icon: Home, end: true },
  { to: "/library", label: "Bibliothèque", icon: Library },
  { to: "/artists", label: "Artistes", icon: Mic2 },
  { to: "/albums", label: "Albums", icon: Disc3 },
  { to: "/favorites", label: "Favoris", icon: Heart },
  { to: "/karaoke", label: "Karaoké", icon: Captions },
  { to: "/studio", label: "Studio audio", icon: SlidersHorizontal },
];

/** Maintenance : bas du panneau « Playlists ». */
export const toolsNav: NavItem[] = [
  { to: "/duplicates", label: "Doublons", icon: Copy },
  { to: "/settings", label: "Paramètres", icon: Settings },
];
