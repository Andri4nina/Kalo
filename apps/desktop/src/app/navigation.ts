import { Heart, Home, Library, ListMusic, Settings, type LucideIcon } from "lucide-react";

export interface NavItem {
  to: string;
  label: string;
  icon: LucideIcon;
  end?: boolean;
}

export const navigation: NavItem[] = [
  { to: "/", label: "Accueil", icon: Home, end: true },
  { to: "/library", label: "Bibliothèque", icon: Library },
  { to: "/playlists", label: "Playlists", icon: ListMusic },
  { to: "/favorites", label: "Favoris", icon: Heart },
  { to: "/settings", label: "Paramètres", icon: Settings },
];
