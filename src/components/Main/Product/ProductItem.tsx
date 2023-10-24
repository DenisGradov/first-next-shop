import { Rating } from "@mui/material";
import styles from "./product.module.scss";
import { RiShoppingCart2Line } from "react-icons/ri";
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
  viewProduct: any;
  product: any;
  products: any;
  setViewProduct: React.Dispatch<React.SetStateAction<any>>;
  setProduct: React.Dispatch<React.SetStateAction<any>>;
}
const ProductItem: React.FC<Product> = ({
  id,
  title,
  description,
  price,
  discountPercentage,
  rating,
  stock,
  brand,
  category,
  thumbnail,
  images,
  product,
  viewProduct,
  setViewProduct,
  products,
  setProduct,
}) => {
  function handUpdate(e: any) {
    e.stopPropagation();
    const newProduct = { ...products };
    console.log(newProduct);
    if (newProduct.cart.includes(product)) {
      newProduct.cart = newProduct.cart.filter((item: any) => item !== product);
    } else {
      newProduct.cart.push(product);
    }
    setProduct(newProduct);
  }
  return (
    <div
      onClick={() => {
        const newView = { ...viewProduct };
        newView.state = true;
        newView.product = product;
        setViewProduct(newView);
      }}
      className={styles.product}
    >
      <img src={thumbnail} className={styles.product__thumbnail} />
      {discountPercentage > 0 && (
        <h2 className={styles.product__discount}>-{discountPercentage}%</h2>
      )}
      {products.cart.includes(product) ? (
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
          value={rating}
          readOnly
        />
      </div>
      <div className={styles.productInfo}>
        <h2 className={styles.productInfo__title}>{title}</h2>
        {discountPercentage > 0 ? (
          <h2 className={styles.productInfo__price}>
            {Math.floor(price - (price * discountPercentage) / 100)}${" "}
            <span className={styles.productInfo__priceOld}>({price}$)</span>
          </h2>
        ) : (
          <h2 className={styles.productInfo__price}>{price}$</h2>
        )}
      </div>
    </div>
  );
};

export default ProductItem;
