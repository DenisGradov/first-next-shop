import zustand, { create } from "zustand";

interface FilterState {
  brands: [boolean, Record<string, boolean>];
  categories: [boolean, Record<string, boolean>];
  setBrands: (value: [boolean, Record<string, boolean>]) => void;
  setCategories: (value: [boolean, Record<string, boolean>]) => void;
}

export const useFilters = create<FilterState>((set) => ({
  brands: [false, {}],
  categories: [false, {}],
  setBrands: (value) => set({ brands: value }),
  setCategories: (value) => set({ categories: value }),
}));
