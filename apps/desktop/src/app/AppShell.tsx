import { useEffect, useRef } from "react";
import { Outlet } from "react-router-dom";
import { applyTheme, useTheme } from "@/app/theme";
import { useKeyboardShortcuts } from "@/app/useKeyboardShortcuts";
import { page } from "@/design/tokens";
import { PlayerBar } from "@/features/player/PlayerBar";
import { QueuePanel } from "@/features/player/QueuePanel";
import { useAudioEngine } from "@/features/player/useAudioEngine";
import { bindMediaSession } from "@/features/player/media.session";
import { watchPlayerSession } from "@/features/player/player.session";
import { applyAccessibility, useAccessibility } from "@/features/settings/accessibility";
import { useStudioEq } from "@/features/studio/useStudioEq";
import { Sidebar } from "./Sidebar";

export function AppShell() {
  const theme = useTheme((state) => state.theme);
  const reduceMotion = useAccessibility((state) => state.reduceMotion);
  const main = useRef<HTMLElement>(null);
  useEffect(() => { applyTheme(theme); applyAccessibility(reduceMotion); }, [theme, reduceMotion]);
  useAudioEngine();
  useStudioEq();
  useKeyboardShortcuts();
  useEffect(bindMediaSession, []);
  useEffect(watchPlayerSession, []);

  return (
    <div className={`${page} ${reduceMotion ? "[&_*]:!animate-none [&_*]:!transition-none" : ""}`}>
      <a
        href="#contenu"
        onClick={(event) => {
          event.preventDefault();
          main.current?.focus();
        }}
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-xl focus:bg-kalo-panel focus:px-4 focus:py-2 focus:text-sm focus:shadow-soft focus:outline-none focus-visible:ring-2 focus-visible:ring-kalo-accent dark:focus:bg-kalo-dark-panel"
      >
        Aller au contenu
      </a>
      <div className="flex h-screen">
        <Sidebar />
        <main ref={main} id="contenu" tabIndex={-1} className="flex-1 overflow-y-auto px-4 pb-40 pt-6 focus:outline-none md:px-8">
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
