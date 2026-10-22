import { NavLink } from "react-router-dom";
import type { NavItem } from "@/app/navigation";
import { focus } from "@/design/tokens";
import { cn } from "@/lib/cn";

export function SidebarNavLink({ to, label, icon: Icon, end }: NavItem) {
  return (
    <NavLink
      to={to}
      end={end}
      title={label}
      className={({ isActive }) =>
        cn(
          "flex items-center justify-center gap-4 rounded-md px-3 py-1.5 text-sm font-bold transition-colors lg:justify-start",
          isActive
            ? "bg-kalo-raised text-kalo-ink dark:bg-kalo-dark-raised dark:text-kalo-dark-ink"
            : "text-kalo-muted hover:text-kalo-ink dark:text-kalo-dark-muted dark:hover:text-kalo-dark-ink",
          focus,
        )
      }
    >
      {({ isActive }) => (
        <>
          <Icon
            size={22}
            strokeWidth={isActive ? 2.4 : 1.9}
            className={cn("shrink-0", isActive && "text-kalo-accent dark:text-kalo-dark-accent")}
            aria-hidden="true"
          />
          <span className="hidden truncate lg:inline">{label}</span>
        </>
      )}
    </NavLink>
  );
}
