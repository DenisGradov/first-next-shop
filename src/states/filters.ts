import { FilterState } from "@/types/types";
import zustand, { create } from "zustand";

export const useFilters = create<FilterState>((set) => ({
  brands: [false, {}],
  categories: [false, {}],
  setBrands: (value) => set({ brands: value }),
  setCategories: (value) => set({ categories: value }),
}));
