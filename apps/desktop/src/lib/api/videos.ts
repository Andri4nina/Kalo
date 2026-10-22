import { invoke } from "@tauri-apps/api/core";
import type { Video } from "@/types";

export const listVideos = (search: string | null = null) => invoke<Video[]>("video_list", { search });
