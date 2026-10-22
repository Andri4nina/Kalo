import { Captions, SlidersHorizontal } from "lucide-react";
import { NavLink } from "react-router-dom";
import { cn } from "@/lib/cn";
import { modeButton, modeOff, modeOn } from "./player.control.styles";

const links = [
  { to: "/karaoke", label: "Ouvrir le karaoké", icon: Captions },
  { to: "/studio", label: "Ouvrir le studio audio", icon: SlidersHorizontal },
];

/** Raccourcis du lecteur vers le karaoké et le studio, actifs sur leur page. */
export function PlayerExtras() {
  return (
    <>
      {links.map(({ to, label, icon: Icon }) => (
        <NavLink
          key={to}
          to={to}
          aria-label={label}
          title={label}
          className={({ isActive }) => cn(modeButton, "hidden sm:inline-flex", isActive ? modeOn : modeOff)}
        >
          <Icon size={18} strokeWidth={1.9} aria-hidden="true" />
        </NavLink>
      ))}
    </>
  );
}
