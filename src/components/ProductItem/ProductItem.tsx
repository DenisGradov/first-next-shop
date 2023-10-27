/* eslint-disable @next/next/no-img-element */
"use client";
import { Rating } from "@mui/material";
import styles from "./product.module.scss";
import { RiShoppingCart2Line } from "react-icons/ri";
import { Product } from "@/types/types";
import { useProduct } from "@/states/productInfo";
interface Props {
  product: Product;
}
const ProductItem: React.FC<Props> = ({ product }) => {
  const productInfo = useProduct.getState();
  function handUpdate(e: any) {
    e.stopPropagation();
    const newProduct = { ...productInfo };
    console.log(newProduct);
    if (newProduct.cart.includes(product)) {
      newProduct.cart = newProduct.cart.filter((item: any) => item !== product);
    } else {
      newProduct.cart.push(product);
    }
    productInfo.setAll(newProduct);
  }
  return (
    <div className={styles.product}>
      <img
        alt={`Img with thmbnail`}
        src={product.thumbnail}
        className={styles.product__thumbnail}
      />
      {product.discountPercentage > 0 && (
        <h2 className={styles.product__discount}>
          -{product.discountPercentage}%
        </h2>
      )}
      {productInfo.cart.includes(product) ? (
        <h2
          className={styles.product__cartActive}
          onClick={(e: any) => {
            handUpdate(e);
          }}
        >
          <RiShoppingCart2Line className={styles.product__cartImg} />
        </h2>
      ) : (
        <h2
          className={styles.product__cart}
          onClick={(e: any) => {
            handUpdate(e);
          }}
        >
          <RiShoppingCart2Line className={styles.product__cartImg} />
        </h2>
      )}
      <div className={styles.product__ratingBg}>
        <Rating
          className={styles.product__ratingBgrating}
          name="half-rating"
          precision={0.1}
          max={5}
          value={product.rating}
          readOnly
          sx={{
            fontSize: "11px",
          }}
        />
      </div>
      <div className={styles.productInfo}>
        <h2 className={styles.productInfo__title}>{product.title}</h2>
        {product.discountPercentage > 0 ? (
          <h2 className={styles.productInfo__price}>
            {Math.floor(
              product.price - (product.price * product.discountPercentage) / 100
            )}
            ${" "}
            <span className={styles.productInfo__priceOld}>
              ({product.price}$)
            </span>
          </h2>
        ) : (
          <h2 className={styles.productInfo__price}>{product.price}$</h2>
        )}
      </div>
    </div>
  );
};

export default ProductItem;