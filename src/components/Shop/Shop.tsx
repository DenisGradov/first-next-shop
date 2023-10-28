/* eslint-disable @next/next/no-img-element */
"use client";
import styles from "./shop.module.scss";
import ProductItem from "../ProductItem/ProductItem";
import CircularProgress from "@mui/material/CircularProgress";
import Slider from "@mui/material/Slider";
import { Box, Rating } from "@mui/material";
import { Accordion, AccordionSummary, Typography } from "@mui/material";
import React, { useState, useEffect } from "react";
import Input from "../Input";
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

export default function Shop() {
  const minMaxPrice = useMinMaxPrice.getState();
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
          <Input />
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
