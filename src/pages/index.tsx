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
import Shop from "@/components/Main/Shop";

interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  brand: string;
  category: string;
  thumbnail: string;
  images: string[];
}
interface ProductInfo {
  products: Product[];
  activePage: number;
  brands: string[];
  categories: string[];
  productsWithPagination: Product[];
  cart: string[];
}

export default function Home() {
  const [product, setProduct] = useState<ProductInfo>({
    products: [],
    activePage: 0,
    brands: [],
    productsWithPagination: [],
    categories: [],
    cart: [],
  }); //
  const [minMaxPrice, setMinMaxPrice] = useState<any[]>([
    [0, 0],
    [0, 0],
  ]);

  const [checkBox, setCheckBox] = useState<any>([]);
  const [searchInput, setSearchInput] = useState<any>("");
  const [sortHow, setSortHow] = useState<any>(10);
  const [viewProduct, setViewProduct] = useState<any>({
    state: false,
    product: [],
  });
  useEffect(() => {
    const newCheckBox: any = { brands: [], categories: [] };
    (newCheckBox.brands = [
      true,
      product.brands.reduce<Record<string, boolean>>((acc, brand) => {
        acc[brand] = false;
        return acc;
      }, {}),
    ]),
      (newCheckBox.categories = [
        true,
        product.categories.reduce<Record<string, boolean>>((acc, category) => {
          acc[category] = false;
          return acc;
        }, {}),
      ]);
    setCheckBox(newCheckBox);
  }, [product.brands, product.categories]);

  useEffect(() => {
    axios
      .get("https://dummyjson.com/products/?limit=100")
      .then((resposne) => {
        const data = useData(resposne.data);
        setProduct(data);
        const products: Product[] = data.products;
        const newMinMaxPrice = [
          [products[0].price, products[0].price],
          [products[0].price, products[0].price],
        ];
        products.map((i: Product) => {
          if (i.price < newMinMaxPrice[0][0]) {
            newMinMaxPrice[0][0] = i.price;
            newMinMaxPrice[1][0] = i.price;
          }
          if (i.price > newMinMaxPrice[0][1]) {
            newMinMaxPrice[0][1] = i.price;
            newMinMaxPrice[1][1] = i.price;
          }
        });
        setMinMaxPrice(newMinMaxPrice);
      })
      .catch((error) => {});
  }, []);
  useEffect(() => {
    if (checkBox) {
      if (checkBox.brands) {
        if (checkBox.brands[1]) {
          const newProduct = { ...product };
          newProduct.productsWithPagination = usePagination(
            checkBox,
            product.products,
            minMaxPrice,
            searchInput,
            sortHow
          );
          newProduct.activePage = 0;
          setProduct(newProduct);
        }
      }
    }
  }, [checkBox, minMaxPrice, sortHow, searchInput]);

  return (
    <div>
      <Header cart={product.cart} />

      <Shop
        products={product.products}
        productsWithPagination={product.productsWithPagination}
        activePage={product.activePage}
        brands={product.brands}
        categories={product.categories}
        cart={product.cart}
        minMaxPrice={minMaxPrice}
        setMinMaxPrice={setMinMaxPrice}
        productt={product}
        product={product}
        checkBox={checkBox}
        setCheckBox={setCheckBox}
        searchInput={searchInput}
        setSearchInput={setSearchInput}
        sortHow={sortHow}
        setSortHow={setSortHow}
        setProduct={setProduct}
        viewProduct={viewProduct}
        setViewProduct={setViewProduct}
      />
    </div>
  );
}
