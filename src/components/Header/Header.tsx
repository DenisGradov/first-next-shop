/* eslint-disable @next/next/no-img-element */
/* eslint-disable react/no-unescaped-entities */
import { RiShoppingCart2Line } from "react-icons/ri";
import logo from "../../data/img/logo.png";
import styles from "./header.module.scss";
export default function Header({ cart }: any) {
  console.log("hi");
  return (
    <div className={styles.header}>
      <div className={styles.headerLeft}>
        <img
          key={logo.src}
          alt={logo.src}
          src={logo.src}
          className={styles.headerLeft__logo}
        />
        <h2 className={styles.headerLeft__title}>Stenford's Shop</h2>
      </div>
      <div className={styles.headerRight}>
        <div className={styles.headerRightImg}>
          <RiShoppingCart2Line className={styles.cartIcon} />
        </div>
        {cart.length > 0 && (
          <h2 className={styles.headerRightValue}>{cart.length}</h2>
        )}
      </div>
    </div>
  );
}
