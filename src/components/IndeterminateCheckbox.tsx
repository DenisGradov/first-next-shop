import * as React from "react";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";

interface Props {
  id: "бренди" | "категорії";
  checkBox: {
    brands: [boolean, Record<string, boolean>];
    categories: [boolean, Record<string, boolean>];
  };
  setCheckBox: (
    value: React.SetStateAction<{
      brands: [boolean, Record<string, boolean>];
      categories: [boolean, Record<string, boolean>];
    }>
  ) => void;
}

export default function IndeterminateCheckbox({
  id,
  checkBox,
  setCheckBox,
}: Props) {
  const handleParentChange = () => {
    if (id === "бренди") {
      const allChecked = Object.values(checkBox.brands[1]).every(Boolean);
      const updatedBrands = { ...checkBox.brands[1] };
      for (let brand in updatedBrands) {
        updatedBrands[brand] = !allChecked;
      }

      setCheckBox((prev) => ({
        ...prev,
        brands: [!allChecked, updatedBrands],
      }));
    } else {
      const allChecked = Object.values(checkBox.categories[1]).every(Boolean);
      const updatedCategories = { ...checkBox.categories[1] };
      for (let category in updatedCategories) {
        updatedCategories[category] = !allChecked;
      }
      setCheckBox((prev) => ({
        ...prev,
        categories: [!allChecked, updatedCategories],
      }));
    }
  };

  const handleChildChange = (brandOrCategory: string) => {
    if (id === "бренди") {
      setCheckBox((prev) => ({
        ...prev,
        brands: [
          Object.values(prev.brands[1]).some(Boolean),
          {
            ...prev.brands[1],
            [brandOrCategory]: !prev.brands[1][brandOrCategory],
          },
        ],
      }));
    } else {
      setCheckBox((prev) => ({
        ...prev,
        categories: [
          Object.values(prev.categories[1]).some(Boolean),
          {
            ...prev.categories[1],
            [brandOrCategory]: !prev.categories[1][brandOrCategory],
          },
        ],
      }));
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
                checked={checkBox.brands[0]}
                indeterminate={
                  !checkBox.brands[0] &&
                  Object.values(checkBox.brands[1]).some(Boolean)
                }
                onChange={handleParentChange}
              />
            }
          />
          <div style={{ marginLeft: "16px" }}>
            {Object.entries(checkBox.brands[1]).map(([brand, isChecked]) => (
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
                checked={checkBox.categories[0]}
                indeterminate={
                  !checkBox.categories[0] &&
                  Object.values(checkBox.categories[1]).some(Boolean)
                }
                onChange={handleParentChange}
              />
            }
          />
          <div style={{ marginLeft: "16px" }}>
            {Object.entries(checkBox.categories[1]).map(
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
