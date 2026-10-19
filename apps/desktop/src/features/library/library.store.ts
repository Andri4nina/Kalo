import { create } from "zustand";

interface LibraryVersion {
  version: number;
  bump: () => void;
}

export const useLibraryVersion = create<LibraryVersion>((set) => ({
  version: 0,
  bump: () => set((state) => ({ version: state.version + 1 })),
}));
