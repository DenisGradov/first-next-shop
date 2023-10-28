import { useMinMaxPrice } from "@/states/minMaxPrice";
import Slider from "@mui/material/Slider";
import styles from "./sliderwithprice.module.scss";
import React, { ChangeEvent } from "react";

function SliderWithPrice() {
  const {
    productPriceRange,
    selectedPriceRange,
    setProductPriceRange,
    setSelectedPriceRange,
  } = useMinMaxPrice();

  const handleInputChange = (
    key: "min" | "max",
    e: ChangeEvent<HTMLInputElement>
  ) => {
    const value = parseFloat(e.target.value);
    if (
      typeof value === "number" &&
      value >= productPriceRange.min &&
      value <= productPriceRange.max
    ) {
      if (key === "min") {
        setSelectedPriceRange(value, selectedPriceRange.max);
      } else if (key === "max") {
        setSelectedPriceRange(selectedPriceRange.min, value);
      }
    }
  };

  return (
    <div
      className={styles.priceRange}
      style={{ zIndex: "999", height: "100px" }}
    >
      <Slider
        valueLabelDisplay="off"
        className={styles.priceRangeSlider}
        getAriaLabel={() => "Temperature range"}
        value={[selectedPriceRange.min, selectedPriceRange.max]}
        min={productPriceRange.min}
        max={productPriceRange.max}
        step={(productPriceRange.max - productPriceRange.min) / 100}
        onChange={(e, newValue) => {
          const values = newValue as number[];
          setSelectedPriceRange(values[0], values[1]);
        }}
        style={{ zIndex: "999" }}
      />
      <div className={styles.priceRangeIputs}>
        {["min", "max"].map((key) => (
          <input
            key={key}
            style={{ zIndex: "999" }}
            onChange={(e) => handleInputChange(key as "min" | "max", e)}
            value={selectedPriceRange[key as "min" | "max"]}
            className={styles.priceRangeInput}
          />
        ))}
      </div>

      <div className={styles.priceRangeMinMax}>
        <h2 className={styles.priceRangeText}>{productPriceRange.min}$</h2>
        <h2 className={styles.priceRangeText}>{productPriceRange.max}$</h2>
      </div>
    </div>
  );
}

export default SliderWithPrice;
