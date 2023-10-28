"use client";
import * as React from "react";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import { useFilters } from "@/states/filters";
import styles from "./indeterminateCheckbox.module.scss";
interface Props {
  id: "бренди" | "категорії";
}

export default function IndeterminateCheckbox({ id }: Props) {
  const filters = { ...useFilters.getState() };

  const toggleAllItems = (
    items: Record<string, boolean>
  ): [boolean, Record<string, boolean>] => {
    const allChecked = Object.values(items).every(Boolean);
    const updatedItems = { ...items };
    for (let item in updatedItems) {
      updatedItems[item] = !allChecked;
    }
    return [!allChecked, updatedItems];
  };

  const handleParentChange = () => {
    if (id === "бренди") {
      const newBrandsArray = toggleAllItems(filters.brands[1]);
      filters.setBrands(newBrandsArray);
    } else {
      const newCategoriesArray = toggleAllItems(filters.categories[1]);
      filters.setCategories(newCategoriesArray);
    }
  };

  const handleChildChange = (brandOrCategory: string) => {
    if (id === "бренди") {
      const updatedBrands = { ...filters.brands[1] };
      updatedBrands[brandOrCategory] = !updatedBrands[brandOrCategory];

      const newBrandsArray: [boolean, Record<string, boolean>] = [
        Object.values(updatedBrands).some(Boolean),
        updatedBrands,
      ];

      filters.setBrands(newBrandsArray);
    } else {
      const updatedCategories = { ...filters.categories[1] };
      updatedCategories[brandOrCategory] = !updatedCategories[brandOrCategory];

      const newCategoriesArray: [boolean, Record<string, boolean>] = [
        Object.values(updatedCategories).some(Boolean),
        updatedCategories,
      ];

      filters.setCategories(newCategoriesArray);
    }
  };

  return (
    <div>
      {id === "бренди" ? (
        <div>
          <FormControlLabel
            label="Бренди"
            control={
              <Checkbox
                checked={filters.brands[0]}
                indeterminate={
                  !filters.brands[0] &&
                  Object.values(filters.brands[1]).some(Boolean)
                }
                onChange={handleParentChange}
              />
            }
          />
          <div className={styles.blockFormControlLabel}>
            {Object.entries(filters.brands[1]).map(([brand, isChecked]) => (
              <FormControlLabel
                key={brand}
                label={brand}
                control={
                  <Checkbox
                    checked={isChecked as boolean}
                    onChange={() => handleChildChange(brand)}
                  />
                }
              />
            ))}
          </div>
        </div>
      ) : (
        <>
          <FormControlLabel
            label="Категорії"
            control={
              <Checkbox
                checked={filters.categories[0]}
                indeterminate={
                  !filters.categories[0] &&
                  Object.values(filters.categories[1]).some(Boolean)
                }
                onChange={handleParentChange}
              />
            }
          />
          <div className={styles.blockFormControlLabel}>
            {Object.entries(filters.categories[1]).map(
              ([category, isChecked]) => (
                <FormControlLabel
                  key={category}
                  label={category}
                  control={
                    <Checkbox
                      checked={isChecked as boolean}
                      onChange={() => handleChildChange(category)}
                    />
                  }
                />
              )
            )}
          </div>
        </>
      )}
    </div>
  );
}
