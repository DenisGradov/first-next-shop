"use client";
import * as React from "react";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import { useProduct } from "@/states/productInfo";
import styles from "./paginationOutlined.module.scss";
export default function PaginationOutlined() {
  const productInfo = useProduct.getState();
  function change(e: React.ChangeEvent<unknown>, page: number) {
    const newProduct = { ...productInfo };
    newProduct.activePage = page - 1;
    productInfo.setAll(newProduct);
  }
  return (
    <Stack spacing={2}>
      <Pagination
        onChange={(e, page) => change(e, page)}
        count={productInfo.productsWithPagination.length}
        page={productInfo.activePage + 1}
        defaultValue={0}
        variant="outlined"
        color="secondary"
        className={styles.pagination}
      />
    </Stack>
  );
}
