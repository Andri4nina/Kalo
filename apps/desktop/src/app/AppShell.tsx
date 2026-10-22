import { useEffect, useRef } from "react";
import { Outlet } from "react-router-dom";
import { applyTheme, useTheme } from "@/app/theme";
import { useKeyboardShortcuts } from "@/app/useKeyboardShortcuts";
import { page, scrollbars, surface } from "@/design/tokens";
import { PlayerBar } from "@/features/player/PlayerBar";
import { QueuePanel } from "@/features/player/QueuePanel";
import { useAudioEngine } from "@/features/player/useAudioEngine";
import { bindMediaSession } from "@/features/player/media.session";
import { watchPlayerSession } from "@/features/player/player.session";
import { applyAccessibility, useAccessibility } from "@/features/settings/accessibility";
import { useFolderWatch } from "@/features/settings/useFolderWatch";
import { useStudioEq } from "@/features/studio/useStudioEq";
import { cn } from "@/lib/cn";
import { Sidebar } from "./Sidebar";
import { SkipLink } from "./SkipLink";

export function AppShell() {
  const theme = useTheme((state) => state.theme);
  const reduceMotion = useAccessibility((state) => state.reduceMotion);
  const main = useRef<HTMLElement>(null);
  useEffect(() => { applyTheme(theme); applyAccessibility(reduceMotion); }, [theme, reduceMotion]);
  useAudioEngine();
  useStudioEq();
  useKeyboardShortcuts();
  useFolderWatch();
  useEffect(bindMediaSession, []);
  useEffect(watchPlayerSession, []);

  return (
    <div className={cn(page, scrollbars, reduceMotion && "[&_*]:!animate-none [&_*]:!transition-none")}>
      <SkipLink target={main} />
      <div className="flex min-h-0 flex-1 gap-2">
        <Sidebar />
        <main ref={main} id="contenu" tabIndex={-1} className={cn(surface, "min-w-0 flex-1 overflow-y-auto px-4 pb-10 pt-6 focus:outline-none md:px-8")}>
          <div className="mx-auto max-w-[1500px]">
            <Outlet />
          </div>
        </main>
      </div>
      <PlayerBar />
      <QueuePanel />
    </div>
  );
}
