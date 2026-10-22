import { assetUrl } from "@/lib/assets";
import { MIX_STEMS, type MixStem } from "./mixer.levels";

export type StemBuffers = Record<MixStem | "original", AudioBuffer>;

async function decode(context: BaseAudioContext, path: string): Promise<AudioBuffer> {
  const url = assetUrl(path);
  if (!url) throw new Error("Pistes lisibles uniquement dans l'application Kalo.");
  const response = await fetch(url);
  if (!response.ok) throw new Error(`Piste illisible : ${path}`);
  return context.decodeAudioData(await response.arrayBuffer());
}

/** Décode les quatre pistes d'une séparation et le morceau d'origine. */
export async function loadStems(context: BaseAudioContext, folder: string, original: string): Promise<StemBuffers> {
  const separator = folder.includes("\\") ? "\\" : "/";
  const entries = await Promise.all(
    MIX_STEMS.map(async (stem) => [stem, await decode(context, `${folder}${separator}${stem}.wav`)] as const),
  );
  const buffers = Object.fromEntries(entries) as Record<MixStem, AudioBuffer>;
  return { ...buffers, original: await decode(context, original) };
}
