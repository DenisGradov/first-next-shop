"use client";
import * as React from "react";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import { useProduct } from "@/states/productInfo";

export default function PaginationOutlined() {
  const productInfo = useProduct.getState();
  function change(e: any, page: number) {
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
        style={{
          margin: "0 auto",
          position: "absolute",
          bottom: "5px",
          left: "45vw",
        }}
      />
    </Stack>
  );
}
