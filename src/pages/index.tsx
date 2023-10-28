/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/rules-of-hooks */
"use client";
import { Inter } from "next/font/google";
import Header from "@/components/Header/Header";
import Shop from "@/components/Shop/Shop";
import { useProduct } from "@/states/productInfo";

export default function Home() {
  const product = useProduct();
  return (
    <div>
      <Header />
      <Shop />
    </div>
  );
}
