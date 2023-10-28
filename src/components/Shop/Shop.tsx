/* eslint-disable @next/next/no-img-element */
"use client";
import styles from "./shop.module.scss";
import ProductItem from "../ProductItem/ProductItem";
import CircularProgress from "@mui/material/CircularProgress";
import { Box, Rating } from "@mui/material";
import { Accordion, AccordionSummary, Typography } from "@mui/material";
import React, { useState, useEffect } from "react";
import UnstyledSelectBasic from "../UnstyledSelectBasic";
import UnstyledButtonsSimple from "../UnstyledButtonsSimple";
import AccordionIndeterminateCheckbox from "../AccordionIndeterminateCheckbox";
import PaginationOutlined from "../PaginationOutlined";

import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Product } from "@/types/types";
import { useMinMaxPrice } from "@/states/minMaxPrice";
import { useProduct } from "@/states/productInfo";
import { useWindow } from "@/hooks/useWindow";
import SliderWithPrice from "./SliderWithPrice/SliderWithPrice";
import { useInput } from "@mui/base/useInput";
import { unstable_useForkRef as useForkRef } from "@mui/utils";

import { styled } from "@mui/system";
import { useSearchInput } from "@/states/searchInput";

const blue = {
  100: "#8a07fc",
  200: "#8a07fc",
  400: "#8a07fc",
  500: "#8a07fc",
  600: "#8a07fc",
};

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

  // Make sure that both the forwarded ref and the ref returned from the getInputProps are applied on the input element
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
          style={{ position: "absolute", left: "50vw" }}
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
          />
          <UnstyledButtonsSimple />
          <UnstyledSelectBasic />
        </div>
      )}

      <div className={styles.itemBox}>
        {!!product.productsWithPagination.length && (
          <>
            {windowSize < 1118 ? (
              <div className={styles.shopFiltersBlock}>
                <Accordion
                  style={{
                    padding: "5px",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    margin: "0 auto",
                    width: "76vw",
                    zIndex: "100",
                    overflowY: "auto",
                  }}
                  className={styles.Fil}
                >
                  <AccordionSummary
                    style={{
                      zIndex: "999",
                    }}
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                  >
                    <Typography component="div">Фільтри</Typography>
                  </AccordionSummary>
                  <div
                    style={{
                      maxHeight: "400px",
                      margin: "0 auto",
                      height: "300px",
                    }}
                  >
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
                  style={{ position: "absolute", left: "50vw" }}
                  color="secondary"
                />
              </Box>
            )}
            {!!product.productsWithPagination.length &&
              product.productsWithPagination[0] && (
                <>
                  <div className={styles.shopItemsProducts}>
                    {product.productsWithPagination.map(
                      (productsArray, page) => {
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
