/* eslint-disable @next/next/no-img-element */
"use client";
import { Rating } from "@mui/material";
import styles from "./product.module.scss";
import { RiShoppingCart2Line } from "react-icons/ri";
import { Product } from "@/types/types";
import { useProduct } from "@/states/productInfo";
import Link from "next/link";
interface Props {
  product: Product;
}
const ProductItem: React.FC<Props> = ({ product }) => {
  const productInfo = useProduct.getState();
  function handleUpdate(e: React.MouseEvent<HTMLHeadingElement>) {
    e.preventDefault();
    const newProduct = { ...productInfo };
    console.log(newProduct);
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
    <Link href={`/product/${product.id}`} className={styles.product}>
      <img
        alt={`Img with thumbnail`}
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
          onClick={(e: React.MouseEvent<HTMLHeadingElement>) => {
            handleUpdate(e);
          }}
        >
          <RiShoppingCart2Line className={styles.product__cartImg} />
        </h2>
      ) : (
        <h2
          className={styles.product__cart}
          onClick={(e: React.MouseEvent<HTMLHeadingElement>) => {
            handleUpdate(e);
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
      <div className={styles.productInfo}>
        <h2 className={styles.productInfo__otherInfo}>{product.brand}</h2>
        <h2 className={styles.productInfo__otherInfo}>{product.category}</h2>
      </div>
    </Link>
  );
};

export default ProductItem;
