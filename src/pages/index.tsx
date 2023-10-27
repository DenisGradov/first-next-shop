/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/rules-of-hooks */
"use client";
import { Inter } from "next/font/google";
import Header from "@/components/Header/Header";
const inter = Inter({ subsets: ["latin"] });
import axios from "axios";
import React, { useEffect, useState } from "react";
import useData from "@/hooks/useData";
import usePagination from "@/hooks/usePagination";
import Shop from "@/components/Shop/Shop";
import { Product, ProductInfo } from "@/types/types";
import { useProduct } from "@/states/productInfo";
import { useMinMaxPrice } from "@/states/minMaxPrice";
import { useFilters } from "@/states/filters";
import { useSearchInput } from "@/states/searchInput";
import { useSortHow } from "@/states/sortHow";
import { fetchData } from "@/api/api";

export default function Home() {
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
      const newProduct = { ...product };
      newProduct.productsWithPagination = usePagination();
      newProduct.activePage = 0;
      product.setAll(newProduct);
    }
  }, [filters, minMaxPrice, sortHow, searchInput]);

  return (
    <div>
      <Header cart={product.cart} />
      <Shop />
    </div>
  );
}
