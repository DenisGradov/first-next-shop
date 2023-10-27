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
import UnstyledButtonsSimple2 from "../UnstyledButtonsSimple2";
import UnstyledButtonsSimple3 from "../UnstyledButtonsSimple3";

import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Product } from "@/types/types";
import { useMinMaxPrice } from "@/states/minMaxPrice";
import { useProduct } from "@/states/productInfo";
import { useWindow } from "@/hooks/useWindow";

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
            {windowSize < 1118
              ? true && (
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
                        <div
                          className={styles.priceRange}
                          style={{
                            zIndex: "999",
                            height: "100px",
                          }}
                        >
                          <Slider
                            valueLabelDisplay="off"
                            className={styles.priceRangeSlider}
                            getAriaLabel={() => "Temperature range"}
                            value={minMaxPrice.values[1]}
                            min={minMaxPrice.values[0][0]}
                            max={minMaxPrice.values[0][1]}
                            step={
                              (minMaxPrice.values[0][1] -
                                minMaxPrice.values[0][0]) /
                              100
                            }
                            onChange={(e, newValue) => {
                              const newMinMaxPrice: [number[], number[]] = [
                                minMaxPrice.values[0],
                                newValue as number[],
                              ];
                              minMaxPrice.setAll(newMinMaxPrice);
                            }}
                            style={{
                              zIndex: "999",
                            }}
                          />
                          <div className={styles.priceRangeIputs}>
                            <input
                              style={{
                                zIndex: "999",
                              }}
                              onChange={(e) => {
                                if (
                                  typeof parseFloat(e.target.value) != "number"
                                )
                                  return;
                                const valueFromEvent: number = parseFloat(
                                  e.target.value
                                );
                                if (
                                  valueFromEvent > minMaxPrice.values[0][0] &&
                                  valueFromEvent < minMaxPrice.values[0][1]
                                ) {
                                  const newMinMaxPrice = { ...minMaxPrice };
                                  newMinMaxPrice.values[1][0] = valueFromEvent;
                                  minMaxPrice.setAll(newMinMaxPrice.values);
                                }
                              }}
                              value={minMaxPrice.values[1][0]}
                              className={styles.priceRangeInput}
                            />
                            <input
                              onChange={(e) => {
                                if (
                                  typeof parseFloat(e.target.value) != "number"
                                )
                                  return;
                                const valueFromEvent: number = parseFloat(
                                  e.target.value
                                );
                                if (
                                  valueFromEvent > minMaxPrice.values[0][0] &&
                                  valueFromEvent < minMaxPrice.values[0][1]
                                ) {
                                  const newMinMaxPrice = { ...minMaxPrice };
                                  newMinMaxPrice.values[1][0] = valueFromEvent;
                                  minMaxPrice.setAll(newMinMaxPrice.values);
                                }
                              }}
                              value={minMaxPrice.values[1][1]}
                              className={styles.priceRangeInput}
                            />
                          </div>
                          <div className={styles.priceRangeMinMax}>
                            <h2 className={styles.priceRangeText}>
                              {minMaxPrice.values[0][0]}$
                            </h2>
                            <h2 className={styles.priceRangeText}>
                              {minMaxPrice.values[0][1]}$
                            </h2>
                          </div>
                        </div>
                      </div>
                    </Accordion>
                  </div>
                )
              : true && (
                  <div>
                    <AccordionIndeterminateCheckbox />
                    <div className={styles.priceRange}>
                      <Slider
                        valueLabelDisplay="off"
                        className={styles.priceRangeSlider}
                        getAriaLabel={() => "Temperature range"}
                        value={minMaxPrice.values[1]}
                        min={minMaxPrice.values[0][0]}
                        max={minMaxPrice.values[0][1]}
                        step={
                          (minMaxPrice.values[0][1] -
                            minMaxPrice.values[0][0]) /
                          100
                        }
                        onChange={(e, newValue) => {
                          const newMinMaxPrice: [number[], number[]] = [
                            minMaxPrice.values[1],
                            newValue as number[],
                          ];
                          minMaxPrice.setAll(newMinMaxPrice);
                        }}
                      />
                      <div className={styles.priceRangeIputs}>
                        <input
                          onChange={(e) => {
                            if (typeof parseFloat(e.target.value) != "number")
                              return;
                            const valueFromEvent: number = parseFloat(
                              e.target.value
                            );
                            if (
                              valueFromEvent > minMaxPrice.values[0][0] &&
                              valueFromEvent < minMaxPrice.values[0][1]
                            ) {
                              const newMinMaxPrice = { ...minMaxPrice };
                              newMinMaxPrice.values[1][0] = valueFromEvent;
                              minMaxPrice.setAll(newMinMaxPrice.values);
                            }
                          }}
                          value={minMaxPrice.values[1][0]}
                          className={styles.priceRangeInput}
                        />
                        <input
                          onChange={(e) => {
                            if (typeof parseFloat(e.target.value) != "number")
                              return;
                            const valueFromEvent: number = parseFloat(
                              e.target.value
                            );
                            if (
                              valueFromEvent > minMaxPrice.values[0][0] &&
                              valueFromEvent < minMaxPrice.values[0][1]
                            ) {
                              const newMinMaxPrice = { ...minMaxPrice };
                              newMinMaxPrice.values[1][1] = valueFromEvent;
                              minMaxPrice.setAll(newMinMaxPrice.values);
                            }
                          }}
                          value={minMaxPrice.values[1][1]}
                          className={styles.priceRangeInput}
                        />
                      </div>
                      <div className={styles.priceRangeMinMax}>
                        <h2 className={styles.priceRangeText}>
                          {minMaxPrice.values[0][0]}$
                        </h2>
                        <h2 className={styles.priceRangeText}>
                          {minMaxPrice.values[0][1]}$
                        </h2>
                      </div>
                    </div>
                  </div>
                )}
          </>
        )}
        {true ? (
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
                <div className={styles.shopItemsProducts}>
                  <div className={styles.shopItemsProductsBlock}>
                    <div className={styles.shopItemsProductsBlockItems}>
                      {product.productsWithPagination.map(
                        (productsArray, page) => {
                          if (page == product.activePage) {
                            return productsArray.map((product: Product) => {
                              return (
                                <ProductItem
                                  key={product.id}
                                  product={product}
                                />
                              );
                            });
                          }
                        }
                      )}
                    </div>
                    <PaginationOutlined />
                  </div>
                </div>
              )}
          </div>
        ) : (
          <div className={styles.shopItems}></div>
        )}
      </div>
    </div>
  );
}
