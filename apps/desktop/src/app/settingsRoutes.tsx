import { Route } from "react-router-dom";
import { SettingsLayout } from "@/features/settings/SettingsLayout";
import { SettingsLibraryPage } from "@/features/settings/SettingsLibraryPage";
import { SettingsPage } from "@/features/settings/SettingsPage";
import { SettingsPrivacyPage } from "@/features/settings/SettingsPrivacyPage";
import { SettingsShortcutsPage } from "@/features/settings/SettingsShortcutsPage";

/** Sous-pages des paramètres, à placer dans les routes de la coquille. */
export function settingsRoutes() {
  return (
    <Route path="settings" element={<SettingsLayout />}>
      <Route index element={<SettingsPage />} />
      <Route path="library" element={<SettingsLibraryPage />} />
      <Route path="privacy" element={<SettingsPrivacyPage />} />
      <Route path="shortcuts" element={<SettingsShortcutsPage />} />
    </Route>
  );
}
