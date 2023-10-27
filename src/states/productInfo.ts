import { ProductInfo } from "@/types/types";
import zustand, { create } from "zustand";

export const useProduct = create<ProductInfo>((set) => ({
  products: [],
  activePage: 0,
  brands: [],
  productsWithPagination: [],
  categories: [],
  cart: [],
  setAll: (values) => set((state) => ({ ...state, ...values })),
}));
