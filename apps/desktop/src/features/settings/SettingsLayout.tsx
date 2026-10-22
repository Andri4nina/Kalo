import { NavLink, Outlet } from "react-router-dom";
import { chipOff, chipOn, focus } from "@/design/tokens";
import { cn } from "@/lib/cn";

const links = [
  { to: "/settings", label: "Général", end: true },
  { to: "/settings/library", label: "Bibliothèque" },
  { to: "/settings/privacy", label: "Confidentialité et données" },
  { to: "/settings/shortcuts", label: "Raccourcis" },
];

export function SettingsLayout() {
  return (
    <div>
      <nav aria-label="Sections des paramètres" className="mb-5 flex flex-wrap gap-2">
        {links.map(({ to, label, end }) => (
          <NavLink
            key={to}
            to={to}
            end={end}
            className={({ isActive }) =>
              cn(
                "rounded-full px-3 py-1.5 text-sm font-semibold transition-colors",
                focus,
                isActive
                  ? chipOn
                  : chipOff,
              )
            }
          >
            {label}
          </NavLink>
        ))}
      </nav>
      <Outlet />
    </div>
  );
}
