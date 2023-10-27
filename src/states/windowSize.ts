import create from "zustand";
import { WindowSize } from "@/types/types";

export const useWindowSize = create<WindowSize>((set) => ({
  windowWidth: undefined,
  setAll: (width) => set({ windowWidth: width }),
}));
