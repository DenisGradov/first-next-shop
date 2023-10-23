import * as React from "react";
import { Button, buttonClasses } from "@mui/base/Button";
import { styled } from "@mui/system";
import Stack from "@mui/material/Stack";

interface props {
  product: any;
  products: any;
  setProduct: React.Dispatch<React.SetStateAction<any>>;
}

export default function UnstyledButtonsSimple2({
  product,
  products,
  setProduct,
}: props) {
  function handUpdate() {
    const newProduct = { ...products };
    if (newProduct.cart.includes(product)) {
      newProduct.cart = newProduct.cart.filter((item: any) => item !== product);
    } else {
      newProduct.cart.push(product);
    }
    setProduct(newProduct);
  }
  return (
    <Stack spacing={2} direction="row">
      <CustomButton
        onClick={() => {
          handUpdate();
        }}
      >
        В кошик
      </CustomButton>
    </Stack>
  );
}

const blue = {
  500: "#8a07fc",
  600: "#9c37f5",
  700: "#bb6eff",
};

const CustomButton = styled(Button)`
  font-family: "IBM Plex Sans", sans-serif;
  font-size: 0.875rem;
  line-height: 1.5;
  background-color: ${blue[500]};
  color: white;
  border-radius: 8px;
  font-weight: 600;
  padding: 8px 16px;
  cursor: pointer;
  transition: all 150ms ease;
  border: none;

  &:hover:not(:disabled) {
    background-color: ${blue[600]};
  }

  &:active:not(:disabled) {
    background-color: ${blue[700]};
  }

  &.${buttonClasses.focusVisible} {
    box-shadow: 0 4px 20px 0 rgb(61 71 82 / 0.1), 0 0 0 5px rgb(0 127 255 / 0.5);
    outline: none;
  }

  &.${buttonClasses.disabled} {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;
