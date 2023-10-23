import * as React from "react";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";

interface props {
  product: any;
  setProduct: React.Dispatch<React.SetStateAction<any>>;
}

const PaginationOutlined: React.FC<props> = ({ product, setProduct }) => {
  function change(e: any, page: number) {
    const newProduct = { ...product };
    newProduct.activePage = page - 1;
    setProduct(newProduct);
  }
  return (
    <Stack spacing={2}>
      <Pagination
        onChange={(e, page) => change(e, page)}
        count={product.productsWithPagination.length}
        page={product.activePage + 1}
        defaultValue={0}
        variant="outlined"
        color="secondary"
        style={{ margin: "0 auto" }}
      />
    </Stack>
  );
};

export default PaginationOutlined;
