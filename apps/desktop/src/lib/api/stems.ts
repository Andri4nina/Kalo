import { invoke } from "@tauri-apps/api/core";
import type { StemJob, StemModelStatus } from "@/types";

export const stemModelStatus = () => invoke<StemModelStatus>("stem_model_status");

export const installStemModel = () => invoke<void>("stem_model_install");

export const uninstallStemModel = () => invoke<void>("stem_model_uninstall");

export const cancelStem = () => invoke<void>("stem_cancel");

export const startStem = (trackId: number) => invoke<number>("stem_start", { trackId });

export const listStemJobs = () => invoke<StemJob[]>("stem_jobs");

export const deleteStemJob = (jobId: number) => invoke<void>("stem_delete", { jobId });

export const exportStem = (jobId: number, stem: string, destination: string) =>
  invoke<void>("stem_export", { jobId, stem, destination });
