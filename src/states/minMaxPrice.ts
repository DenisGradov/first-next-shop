import { MinMaxPriceState } from "@/types/types";
import { create } from "zustand";

export const useMinMaxPrice = create<MinMaxPriceState>((set) => ({
  productPriceRange: {
    min: 0,
    max: 0,
  },
  selectedPriceRange: {
    min: 0,
    max: 0,
  },
  setProductPriceRange: (min, max) => set({ productPriceRange: { min, max } }),
  setSelectedPriceRange: (min, max) =>
    set({ selectedPriceRange: { min, max } }),
}));
