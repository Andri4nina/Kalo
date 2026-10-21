import { usePlayer } from "@/features/player/player.store";

export const resetPlayer = () =>
  usePlayer.setState({
    queue: [],
    index: -1,
    history: [],
    queueSource: null,
    resumePositionMs: 0,
    playing: false,
    positionMs: 0,
    error: null,
    volume: 0.8,
    balance: 0,
    shuffle: false,
    repeat: "off",
    muted: false,
  });
