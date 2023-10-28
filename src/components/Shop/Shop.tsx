/* eslint-disable @next/next/no-img-element */
"use client";
import React from "react";
import styles from "./shop.module.scss";
import { Product } from "@/types/types";
import ProductItem from "../ProductItem/ProductItem";
import UnstyledSelectBasic from "../MUIItems/UnstyledSelectBasic";
import UnstyledButtonsSimple from "../MUIItems/UnstyledButtonsSimple";
import AccordionIndeterminateCheckbox from "../MUIItems/AccordionIndeterminateCheckbox";
import PaginationOutlined from "../MUIItems/PaginationOutlined";
import SliderWithPrice from "./SliderWithPrice/SliderWithPrice";
import { useWindow } from "@/hooks/useWindow";
import { useSearchInput } from "@/states/searchInput";
import { useProduct } from "@/states/productInfo";
import { useInput } from "@mui/base/useInput";
import { unstable_useForkRef as useForkRef } from "@mui/utils";
import { styled } from "@mui/system";
import CircularProgress from "@mui/material/CircularProgress";
import { Box } from "@mui/material";
import { Accordion, AccordionSummary, Typography } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const grey = {
  50: "#F3F6F9",
  100: "#E7EBF0",
  200: "#E0E3E7",
  300: "#CDD2D7",
  400: "#B2BAC2",
  500: "#A0AAB4",
  600: "#6F7E8C",
  700: "#3E5060",
  800: "#2D3843",
  900: "#1A2027",
};

const StyledInputElement = styled("input")(
  ({ theme }) => `
  width: 320px;
  
  @media (max-width: 750px) {
    width: 200px;
  }
  @media (max-width: 580px) {
    width: 100px;
  }
  @media (max-width: 480px) {
    width: 100px; 
  }
  font-family: IBM Plex Sans, sans-serif;
  font-size: 0.875rem;
  font-weight: 400;
  line-height: 1.5;
  padding: 7px 12px;
  border-radius: 8px;
  border-top-right-radius: 0px;
  border-bottom-right-radius: 0px;
  color: ${theme.palette.mode === "dark" ? grey[300] : grey[900]};
  background: ${theme.palette.mode === "dark" ? grey[900] : "#fff"};
  border: 1px solid ${theme.palette.mode === "dark" ? grey[700] : grey[200]};
  box-shadow: 0px 2px 2px ${
    theme.palette.mode === "dark" ? grey[900] : grey[50]
  };

  &:hover {
    border-color: #8a07fc;
  }

  &:focus {
    border-color:#8a07fc;
    box-shadow: 0 0 0 1px #8a07fc;
  }

  // firefox
  &:focus-visible {
    outline: 0;
  }
`
);

const CustomInput = React.forwardRef(function CustomInput(
  props: React.InputHTMLAttributes<HTMLInputElement>,
  ref: React.ForwardedRef<HTMLInputElement>
) {
  const { getRootProps, getInputProps } = useInput(props);

  const inputProps = getInputProps();

  inputProps.ref = useForkRef(inputProps.ref, ref);

  return (
    <div {...getRootProps()}>
      <StyledInputElement {...props} {...inputProps} />
    </div>
  );
});
export default function Shop() {
  const searchInput = useSearchInput();
  const product = useProduct.getState();
  const windowSize = useWindow();

  if (windowSize === undefined)
    return (
      <Box
        display="flex"
        alignItems="center"
        justifyContent="center"
        height="80vh"
      >
        <CircularProgress
          className={styles.circularProgress}
          color="secondary"
        />
      </Box>
    );
  return (
    <div className={styles.shop}>
      {!!product.productsWithPagination.length && (
        <div className={styles.searchTools}>
          <CustomInput
            aria-label="Search Input"
            placeholder="Я шукаю…"
            value={searchInput.values}
            onChange={(e) => searchInput.setAll(e.target.value)}
            className={styles.searchToolsItem}
          />
          <div className={styles.searchToolsItem}>
            <UnstyledButtonsSimple />
          </div>
          <div className={styles.searchToolsItem}>
            <UnstyledSelectBasic />
          </div>
        </div>
      )}

      <div className={styles.itemBox}>
        {!!product.productsWithPagination.length && (
          <>
            {windowSize < 1118 ? (
              <div className={styles.shopFiltersBlock}>
                <Accordion className={styles.shopFiltersBlockAccordion}>
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                  >
                    <Typography component="div">Фільтри</Typography>
                  </AccordionSummary>
                  <div className={styles.shopFiltersBlockAccordionBlock}>
                    <AccordionIndeterminateCheckbox />
                    <SliderWithPrice />
                  </div>
                </Accordion>
              </div>
            ) : (
              <div className={styles.filters}>
                <AccordionIndeterminateCheckbox />
                <SliderWithPrice />
              </div>
            )}
          </>
        )}
        {
          <div className={styles.shopItems}>
            {!!!product.productsWithPagination.length && (
              <Box
                display="flex"
                alignItems="center"
                justifyContent="center"
                height="80vh"
              >
                <CircularProgress
                  className={styles.circularProgress}
                  color="secondary"
                />
              </Box>
            )}
            {!!product.productsWithPagination.length &&
              product.productsWithPagination[0] && (
                <>
                  <div className={styles.shopItemsProducts}>
                    {product.productsWithPagination.map(
                      (productsArray: Product[], page: number) => {
                        if (page == product.activePage) {
                          return productsArray.map((product: Product) => {
                            return (
                              <ProductItem key={product.id} product={product} />
                            );
                          });
                        }
                      }
                    )}
                  </div>
                  <PaginationOutlined />
                </>
              )}
          </div>
        }
      </div>
    </div>
  );
}
