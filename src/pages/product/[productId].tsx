/* eslint-disable @next/next/no-img-element */
import { useRouter } from "next/router";
import styles from "./productId.module.scss";
import { Rating } from "@mui/material";
import { useProduct } from "@/states/productInfo";
import React, { useEffect } from "react";
import Button from "@mui/material/Button";
import Home from "..";
import Header from "@/components/Header/Header";
import { Product } from "@/types/types";
function ProductPage() {
  const router = useRouter();
  const productInfo = useProduct.getState();
  const { productId } = router.query;
  const product = productInfo.products[Number(productId) - 1];
  if (!product) return;
  const handleRedirectToHome = () => {
    router.push("/");
  };
  function handlUpdateCart() {
    const newProduct = { ...productInfo };
    if (newProduct.cart.includes(product)) {
      newProduct.cart = newProduct.cart.filter(
        (item: Product) => item !== product
      );
    } else {
      newProduct.cart.push(product);
    }
    productInfo.setAll(newProduct);
  }
  return (
    <div>
      <Header />
      <div className={styles.shopItemsCard}>
        <div className={styles.shopItemsCardList}>
          {product.images.map((img: string, index: number) => {
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
        <h2 className={styles.shopItemsTextTitle}>{product.title}</h2>
        <Rating
          className={styles.shopItemsRating}
          name="half-rating"
          precision={0.1}
          max={5}
          value={product.rating}
          readOnly
        />
        <h2 className={styles.shopItemsDescription}>{product.description}</h2>
        <h2 className={styles.shopItemsText}>
          Прайс:{" "}
          {Math.floor(
            product.price - (product.price * product.discountPercentage) / 100
          )}
          $ (знижка -{product.discountPercentage}%)
        </h2>
        <h2 className={styles.shopItemsText}>
          Штук на складі: {product.stock}
        </h2>
        <h2 className={styles.shopItemsText}>Бренд: {product.brand}</h2>
        <h2 className={styles.shopItemsText}>Категорія: {product.category}</h2>
        <div className={styles.shopItemsButtons}>
          <div className={styles.shopItemsButtonsBlock}>
            <button
              onClick={handleRedirectToHome}
              className={styles.shopItemsButtonsBlockButton}
            >
              Назад
            </button>
          </div>
          <div className={styles.shopItemsButtonsBlock}>
            <button
              onClick={handlUpdateCart}
              className={styles.shopItemsButtonsBlockButton}
            >
              В кошик
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductPage;
