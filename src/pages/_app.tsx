/* eslint-disable react-hooks/exhaustive-deps */
import { useFilters } from "@/states/filters";
import React, { useEffect, useState } from "react";
import { useMinMaxPrice } from "@/states/minMaxPrice";
import { useProduct } from "@/states/productInfo";
import { useSearchInput } from "@/states/searchInput";
import { useSortHow } from "@/states/sortHow";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { fetchData } from "@/api/api";
import usePagination from "@/hooks/usePagination";
import getPaginationData from "@/hooks/usePagination";

export default function App({ Component, pageProps }: AppProps) {
  const product = useProduct();
  const minMaxPrice = useMinMaxPrice();
  const filters = useFilters();
  const searchInput = useSearchInput();
  const sortHow = useSortHow();

  useEffect(() => {
    const newBrands: [boolean, Record<string, boolean>] = [
      true,
      product.brands.reduce<Record<string, boolean>>((acc, brand) => {
        acc[brand] = false;
        return acc;
      }, {}),
    ];

    const newCategories: [boolean, Record<string, boolean>] = [
      true,
      product.categories.reduce<Record<string, boolean>>((acc, category) => {
        acc[category] = false;
        return acc;
      }, {}),
    ];
    filters.setBrands(newBrands);
    filters.setCategories(newCategories);
  }, [product.brands, product.categories]);

  //Запрос к АПИ
  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (filters && filters.brands && filters.brands[1]) {
      const productsForPagination = getPaginationData({
        filters: filters,
        minMaxPrice: minMaxPrice,
        searchInput: searchInput,
        products: product.products,
        sortHow: sortHow.values,
      });

      const newProduct = { ...product };
      newProduct.productsWithPagination = productsForPagination;
      newProduct.activePage = 0;
      product.setAll(newProduct);
    }
  }, [filters, minMaxPrice, sortHow, searchInput]);

  return <Component {...pageProps} />;
}
