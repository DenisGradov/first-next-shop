/* eslint-disable @next/next/no-img-element */
import styles from "./shop.module.scss";
import ProductItem from "./Product/ProductItem";
import CircularProgress from "@mui/material/CircularProgress";
import Slider from "@mui/material/Slider";
import { Box, Rating } from "@mui/material";
import { Accordion, AccordionSummary, Typography } from "@mui/material";
import React, { useState, useEffect } from "react";

function useWindowSize() {
  const [windowSize, setWindowSize] = useState<undefined | number>(undefined);

  useEffect(() => {
    if (typeof window !== "undefined") {
      // Это проверка на выполнение кода на стороне клиента
      const handleResize = () => {
        setWindowSize(window.innerWidth); // Получение ширины экрана
      };

      window.addEventListener("resize", handleResize); // Слушатель изменения размера экрана
      handleResize(); // Получение начального размера экрана

      return () => window.removeEventListener("resize", handleResize); // Удаление слушателя при размонтировании компонента
    }
  }, []); // Пустой массив зависимостей означает, что этот эффект будет вызван только один раз при монтировании компонента

  return windowSize;
}
import Input from "../Input";
import UnstyledSelectBasic from "../UnstyledSelectBasic";
import UnstyledButtonsSimple from "../UnstyledButtonsSimple";
import AccordionIndeterminateCheckbox from "../AccordionIndeterminateCheckbox";
import PaginationOutlined from "../PaginationOutlined";
import UnstyledButtonsSimple2 from "../UnstyledButtonsSimple2";
import UnstyledButtonsSimple3 from "../UnstyledButtonsSimple3";

import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
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
  productsWithPagination: any[];
  activePage: number;
  brands: string[];
  categories: string[];
  cart: any[];
  minMaxPrice: any[];
  setMinMaxPrice: React.Dispatch<React.SetStateAction<any>>;
  product: any;
  productt: any;
  checkBox: any;
  searchInput: any;
  setSearchInput: any;
  sortHow: any;
  setSortHow: any;
  viewProduct: any;
  setCheckBox: React.Dispatch<React.SetStateAction<any>>;
  setProduct: React.Dispatch<React.SetStateAction<any>>;
  setViewProduct: React.Dispatch<React.SetStateAction<any>>;
} //!!!
const Shop: React.FC<ProductInfo> = ({
  products,
  productsWithPagination,
  activePage,
  brands,
  categories,
  cart,
  minMaxPrice,
  setMinMaxPrice,
  product,
  productt,
  checkBox,
  setCheckBox,
  setProduct,
  searchInput,
  setSearchInput,
  sortHow,
  setSortHow,
  viewProduct,
  setViewProduct,
}) => {
  const newMinMaxPrice = { ...minMaxPrice };
  const valueSlider = minMaxPrice[1];
  const windowSize = useWindowSize();
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
      {!!productsWithPagination.length && !viewProduct.state && (
        <div className={styles.searchTools}>
          <Input searchInput={searchInput} setSearchInput={setSearchInput} />
          <UnstyledButtonsSimple />
          <UnstyledSelectBasic sortHow={sortHow} setSortHow={setSortHow} />
        </div>
      )}

      <div
        className={styles.itemBox}
        style={
          viewProduct.state ? { width: "100%" } : { border: "0px solid #000" }
        }
      >
        {!!productsWithPagination.length && (
          <div
            className={
              !viewProduct.state ? styles.shopFilters : styles.shopFiltersOff
            }
          >
            {windowSize < 1118
              ? !viewProduct.state && (
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
                        <AccordionIndeterminateCheckbox
                          brands={brands}
                          categories={categories}
                          product={product}
                          checkBox={checkBox}
                          setCheckBox={setCheckBox}
                        />
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
                            value={valueSlider}
                            min={minMaxPrice[0][0]}
                            max={minMaxPrice[0][1]}
                            step={(minMaxPrice[0][1] - minMaxPrice[0][0]) / 100}
                            onChange={(e, newValue) => {
                              const newMinMaxPrice = { ...minMaxPrice };
                              newMinMaxPrice[1] = newValue;
                              setMinMaxPrice(newMinMaxPrice);
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
                                  typeof parseFloat(e.target.value) ==
                                    "number" &&
                                  e.target.value > minMaxPrice[0][0] &&
                                  e.target.value < minMaxPrice[0][1]
                                ) {
                                  const newMinMaxPrice = { ...minMaxPrice };
                                  newMinMaxPrice[1][0] = e.target.value;
                                  setMinMaxPrice(newMinMaxPrice);
                                }
                              }}
                              value={minMaxPrice[1][0]}
                              className={styles.priceRangeInput}
                            />
                            <input
                              onChange={(e) => {
                                if (
                                  typeof parseFloat(e.target.value) ==
                                    "number" &&
                                  e.target.value > minMaxPrice[0][0] &&
                                  e.target.value < minMaxPrice[0][1]
                                ) {
                                  const newMinMaxPrice = { ...minMaxPrice };
                                  newMinMaxPrice[1][1] = e.target.value;
                                  setMinMaxPrice(newMinMaxPrice);
                                }
                              }}
                              value={minMaxPrice[1][1]}
                              className={styles.priceRangeInput}
                            />
                          </div>
                          <div className={styles.priceRangeMinMax}>
                            <h2 className={styles.priceRangeText}>
                              {minMaxPrice[0][0]}$
                            </h2>
                            <h2 className={styles.priceRangeText}>
                              {minMaxPrice[0][1]}$
                            </h2>
                          </div>
                        </div>
                      </div>
                    </Accordion>
                  </div>
                )
              : !viewProduct.state && (
                  <div>
                    <AccordionIndeterminateCheckbox
                      brands={brands}
                      categories={categories}
                      product={product}
                      checkBox={checkBox}
                      setCheckBox={setCheckBox}
                    />
                    <div className={styles.priceRange}>
                      <Slider
                        valueLabelDisplay="off"
                        className={styles.priceRangeSlider}
                        getAriaLabel={() => "Temperature range"}
                        value={valueSlider}
                        min={minMaxPrice[0][0]}
                        max={minMaxPrice[0][1]}
                        step={(minMaxPrice[0][1] - minMaxPrice[0][0]) / 100}
                        onChange={(e, newValue) => {
                          const newMinMaxPrice = { ...minMaxPrice };
                          newMinMaxPrice[1] = newValue;
                          setMinMaxPrice(newMinMaxPrice);
                        }}
                      />
                      <div className={styles.priceRangeIputs}>
                        <input
                          onChange={(e) => {
                            if (
                              typeof parseFloat(e.target.value) == "number" &&
                              e.target.value > minMaxPrice[0][0] &&
                              e.target.value < minMaxPrice[0][1]
                            ) {
                              const newMinMaxPrice = { ...minMaxPrice };
                              newMinMaxPrice[1][0] = e.target.value;
                              setMinMaxPrice(newMinMaxPrice);
                            }
                          }}
                          value={minMaxPrice[1][0]}
                          className={styles.priceRangeInput}
                        />
                        <input
                          onChange={(e) => {
                            if (
                              typeof parseFloat(e.target.value) == "number" &&
                              e.target.value > minMaxPrice[0][0] &&
                              e.target.value < minMaxPrice[0][1]
                            ) {
                              const newMinMaxPrice = { ...minMaxPrice };
                              newMinMaxPrice[1][1] = e.target.value;
                              setMinMaxPrice(newMinMaxPrice);
                            }
                          }}
                          value={minMaxPrice[1][1]}
                          className={styles.priceRangeInput}
                        />
                      </div>
                      <div className={styles.priceRangeMinMax}>
                        <h2 className={styles.priceRangeText}>
                          {minMaxPrice[0][0]}$
                        </h2>
                        <h2 className={styles.priceRangeText}>
                          {minMaxPrice[0][1]}$
                        </h2>
                      </div>
                    </div>
                  </div>
                )}
          </div>
        )}
        {!viewProduct.state ? (
          <div className={styles.shopItems}>
            {!!!productsWithPagination.length && (
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
            {!!productsWithPagination.length &&
              productsWithPagination[0] != 0 && (
                <div className={styles.shopItemsProducts}>
                  <div className={styles.shopItemsProductsBlock}>
                    <div className={styles.shopItemsProductsBlockItems}>
                      {productsWithPagination.map((productsArray, page) => {
                        if (page == activePage) {
                          return productsArray.map((product: any) => {
                            return (
                              <ProductItem
                                viewProduct={viewProduct}
                                setViewProduct={setViewProduct}
                                key={product.id}
                                id={product.id}
                                title={product.title}
                                description={product.description}
                                price={product.price}
                                discountPercentage={product.discountPercentage}
                                rating={product.rating}
                                stock={product.stock}
                                product={product}
                                brand={product.brand}
                                category={product.category}
                                thumbnail={product.thumbnail}
                                images={product}
                                products={productt}
                                setProduct={setProduct}
                              />
                            );
                          });
                        }
                      })}
                    </div>
                    <PaginationOutlined
                      product={product}
                      setProduct={setProduct}
                    />
                  </div>
                </div>
              )}
          </div>
        ) : (
          <div className={styles.shopItems}>
            <div className={styles.shopItemsCard}>
              <div className={styles.shopItemsCardList}>
                {viewProduct.product.images.map((img: any, index: any) => {
                  return (
                    <img
                      key={index}
                      src={img}
                      alt={`Product image ${index + 1}`}
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                      }}
                    />
                  );
                })}
              </div>
              <h2 className={styles.shopItemsTextTitle}>
                {viewProduct.product.title}
              </h2>
              <Rating
                className={styles.shopItemsRating}
                name="half-rating"
                precision={0.1}
                max={5}
                value={viewProduct.product.rating}
                readOnly
              />
              <h2 className={styles.shopItemsDescription}>
                {viewProduct.product.description}
              </h2>
              <h2 className={styles.shopItemsText}>
                Прайс:{" "}
                {Math.floor(
                  viewProduct.product.price -
                    (viewProduct.product.price *
                      viewProduct.product.discountPercentage) /
                      100
                )}
                $ (знижка -{viewProduct.product.discountPercentage}%)
              </h2>
              <h2 className={styles.shopItemsText}>
                Штук на складі: {viewProduct.product.stock}
              </h2>
              <h2 className={styles.shopItemsText}>
                Бренд: {viewProduct.product.brand}
              </h2>
              <h2 className={styles.shopItemsText}>
                Категорія: {viewProduct.product.category}
              </h2>
              <div className={styles.shopItemsButtons}>
                <div className={styles.shopItemsButtonsButton}>
                  <UnstyledButtonsSimple3 setViewProduct={setViewProduct} />
                </div>
                <div className={styles.shopItemsButtonsButton}>
                  <UnstyledButtonsSimple2
                    product={viewProduct.product}
                    setProduct={setProduct}
                    products={product}
                  />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Shop;
