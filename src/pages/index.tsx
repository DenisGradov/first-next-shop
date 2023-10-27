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
  return (
    <div>
      <Header />
      <Shop />
    </div>
  );
}
