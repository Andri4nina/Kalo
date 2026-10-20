import { NavLink } from "react-router-dom";
import { navigation } from "@/app/navigation";
import { SidebarBrand } from "./SidebarBrand";
import { SidebarFooter } from "./SidebarFooter";
import { cn } from "@/lib/cn";
import { focus } from "@/design/tokens";

export function Sidebar() {
  return (
    <aside className="flex w-16 shrink-0 flex-col bg-kalo-panel px-2 py-4 dark:bg-kalo-dark-panel lg:w-60 lg:px-4">
      <SidebarBrand />
      <nav aria-label="Navigation principale" className="flex flex-1 flex-col gap-1">
        {navigation.map(({ to, label, icon: Icon, end }) => (
          <NavLink
            key={to}
            to={to}
            end={end}
            title={label}
            className={({ isActive }) =>
              cn(
                "flex items-center gap-3 rounded-xl px-2.5 py-2.5 text-sm transition-colors lg:px-3",
                isActive
                  ? "bg-kalo-accent-soft font-medium text-kalo-accent-strong dark:bg-kalo-dark-accent-soft dark:text-kalo-dark-accent"
                  : "text-kalo-muted hover:bg-kalo-raised hover:text-kalo-ink dark:text-kalo-dark-muted dark:hover:bg-kalo-dark-raised dark:hover:text-kalo-dark-ink",
                focus,
              )
            }
          >
            <Icon size={18} strokeWidth={1.9} />
            <span className="hidden lg:inline">{label}</span>
          </NavLink>
        ))}
      </nav>
      <SidebarFooter />
    </aside>
  );
}
