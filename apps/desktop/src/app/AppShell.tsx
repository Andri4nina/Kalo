import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { applyTheme, useTheme } from "@/app/theme";
import { useKeyboardShortcuts } from "@/app/useKeyboardShortcuts";
import { page } from "@/design/tokens";
import { PlayerBar } from "@/features/player/PlayerBar";
import { QueuePanel } from "@/features/player/QueuePanel";
import { useAudioEngine } from "@/features/player/useAudioEngine";
import { bindMediaSession } from "@/features/player/media.session";
import { watchPlayerSession } from "@/features/player/player.session";
import { Sidebar } from "./Sidebar";

export function AppShell() {
  const theme = useTheme((state) => state.theme);
  useEffect(() => applyTheme(theme), [theme]);
  useAudioEngine();
  useKeyboardShortcuts();
  useEffect(bindMediaSession, []);
  useEffect(watchPlayerSession, []);

  return (
    <div className={page}>
      <div className="flex h-screen">
        <Sidebar />
        <main className="flex-1 overflow-y-auto px-4 pb-40 pt-6 md:px-8">
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
