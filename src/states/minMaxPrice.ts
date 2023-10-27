import { MinMaxPriceState } from "@/types/types";
import { create } from "zustand";

export const useMinMaxPrice = create<MinMaxPriceState>((set) => ({
  values: [
    [0, 0],
    [0, 0],
  ],
  setAll: (values: [number[], number[]]) =>
    set((state) => ({ ...state, values })),
}));
