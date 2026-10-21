import { NavLink, Outlet } from "react-router-dom";
import { focus } from "@/design/tokens";
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
                "rounded-full border px-3 py-1.5 text-xs transition-colors",
                focus,
                isActive
                  ? "border-kalo-accent bg-kalo-accent-soft font-medium text-kalo-accent-strong dark:border-kalo-dark-accent dark:bg-kalo-dark-accent-soft dark:text-kalo-dark-accent"
                  : "border-kalo-line text-kalo-muted hover:bg-kalo-raised dark:border-kalo-dark-line dark:text-kalo-dark-muted dark:hover:bg-kalo-dark-raised",
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
