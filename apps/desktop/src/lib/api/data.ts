import { invoke } from "@tauri-apps/api/core";

export const backupDatabase = (destination: string) => invoke<void>("data_backup", { destination });

export const restoreDatabase = (source: string) => invoke<void>("data_restore", { source });
