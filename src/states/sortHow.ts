import { create } from "zustand";
import { SortHow } from "@/types/types";

export const useSortHow = create<SortHow>((set) => ({
  values: "Новинки",
  setAll: (values) => set((state) => ({ values })),
}));
