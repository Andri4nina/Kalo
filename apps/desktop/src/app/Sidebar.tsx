import { primaryNav, toolsNav } from "@/app/navigation";
import { surface } from "@/design/tokens";
import { cn } from "@/lib/cn";
import { SidebarBrand } from "./SidebarBrand";
import { SidebarFooter } from "./SidebarFooter";
import { SidebarNavLink } from "./SidebarNavLink";
import { SidebarPlaylists } from "./SidebarPlaylists";

export function Sidebar() {
  return (
    <aside className="flex w-[4.5rem] shrink-0 flex-col gap-2 lg:w-72">
      <div className={cn(surface, "shrink-0 px-2 py-3 lg:px-3")}>
        <SidebarBrand />
        <nav aria-label="Navigation principale" className="flex flex-col gap-0.5">
          {primaryNav.map((item) => <SidebarNavLink key={item.to} {...item} />)}
        </nav>
      </div>
      <div className={cn(surface, "flex min-h-0 flex-1 flex-col overflow-y-auto px-2 py-3 lg:px-3")}>
        <SidebarPlaylists />
        <nav aria-label="Outils" className="mt-2 flex flex-col gap-0.5">
          {toolsNav.map((item) => <SidebarNavLink key={item.to} {...item} />)}
        </nav>
        <SidebarFooter />
      </div>
    </aside>
  );
}
