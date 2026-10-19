import { bindAudioEvents } from "./audio.events";

export const audioElement = new Audio();
audioElement.preload = "metadata";
audioElement.crossOrigin = "anonymous";
bindAudioEvents(audioElement);
