import { create } from "zustand";

type SearchInput = {
  values: string;
  setAll: (values: string) => void;
};

export const useSearchInput = create<SearchInput>((set) => ({
  values: "",
  setAll: (values: string) => set((state) => ({ ...state, values })),
}));
