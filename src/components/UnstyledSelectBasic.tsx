import * as React from "react";
import { Select, SelectProps, selectClasses } from "@mui/base/Select";
import { Option, optionClasses } from "@mui/base/Option";
import { Popper } from "@mui/base/Popper";
import { styled } from "@mui/system";

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
interface Params {
  products: Product[];
  total: number;
  skip: number;
  limit: number;
}
interface ProductInfo {
  products: Product[];
  productsWithPagination: any[];
  activePage: number;
  brands: string[];
  categories: string[];
  cart: string[];
}
const CustomSelect = React.forwardRef(function CustomSelect<
  TValue extends {},
  Multiple extends boolean
>(
  props: SelectProps<TValue, Multiple>,
  ref: React.ForwardedRef<HTMLButtonElement>
) {
  const slots: SelectProps<TValue, Multiple>["slots"] = {
    root: StyledButton,
    listbox: StyledListbox,
    popper: StyledPopper,
    ...props.slots,
  };

  return <Select {...props} ref={ref} slots={slots} />;
}) as <TValue extends {}, Multiple extends boolean>(
  props: SelectProps<TValue, Multiple> & React.RefAttributes<HTMLButtonElement>
) => JSX.Element;
interface InputProps {
  sortHow: any;
  setSortHow: React.Dispatch<React.SetStateAction<any>>;
}
const UnstyledSelectBasic: React.FC<InputProps> = ({ sortHow, setSortHow }) => {
  const handleChange = (e: any) => {
    if ((e.target as HTMLElement).textContent == "Новинки") {
      setSortHow(10);
    } else if (
      (e.target as HTMLElement).textContent == "Від дешевих до дорогих"
    ) {
      setSortHow(20);
    } else if (
      (e.target as HTMLElement).textContent == "Від дорогих до дешевих"
    ) {
      setSortHow(30);
    } else if ((e.target as HTMLElement).textContent == "За рейтингом") {
      setSortHow(40);
    } else if (
      (e.target as HTMLElement).textContent == "За рейтингом зворотньо"
    ) {
      setSortHow(50);
    }
  };
  return (
    <CustomSelect
      value={sortHow}
      onChange={handleChange}
      defaultValue={sortHow}
    >
      <StyledOption value={10}>Новинки</StyledOption>
      <StyledOption value={20}>Від дешевих до дорогих</StyledOption>
      <StyledOption value={30}>Від дорогих до дешевих</StyledOption>
      <StyledOption value={40}>За рейтингом</StyledOption>
      <StyledOption value={50}>За рейтингом зворотньо</StyledOption>
    </CustomSelect>
  );
};
export default UnstyledSelectBasic;

const blue = {
  100: "#DAECFF",
  200: "#99CCF3",
  400: "#3399FF",
  500: "#007FFF",
  600: "#0072E5",
  900: "#003A75",
};

const grey = {
  50: "#f6f8fa",
  100: "#eaeef2",
  200: "#d0d7de",
  300: "#afb8c1",
  400: "#8c959f",
  500: "#6e7781",
  600: "#57606a",
  700: "#424a53",
  800: "#32383f",
  900: "#24292f",
};

const StyledButton = styled("button")(
  ({ theme }) => `
  margin-left: 40px;
  font-family: IBM Plex Sans, sans-serif;
  font-size: 0.875rem;
  box-sizing: border-box;
  min-width: 220px;
  padding: 8px 12px;
  border-radius: 8px;
  text-align: left;
  line-height: 1.5;
  @media (max-width: 480px) {
    margin-left: 0px;
  }
  z-index: 200;
  background: ${theme.palette.mode === "dark" ? grey[900] : "#fff"};
  border: 1px solid ${theme.palette.mode === "dark" ? grey[700] : grey[200]};
  color: ${theme.palette.mode === "dark" ? grey[300] : grey[900]};
  box-shadow: 0px 4px 6px ${
    theme.palette.mode === "dark" ? "rgba(0,0,0, 0.50)" : "rgba(0,0,0, 0.05)"
  };

  transition-property: all;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 120ms;

  &:hover {
    background: ${theme.palette.mode === "dark" ? grey[800] : grey[50]};
    border-color: ${theme.palette.mode === "dark" ? grey[600] : grey[300]};
  }

  &.${selectClasses.focusVisible} {
    border-color: ${blue[400]};
    outline: 3px solid ${theme.palette.mode === "dark" ? blue[500] : blue[200]};
  }

  &.${selectClasses.expanded} {
    &::after {
      content: '▴';
    }
  }

  &::after {
    content: '▾';
    float: right;
  }
  `
);

const StyledListbox = styled("ul")(
  ({ theme }) => `
  font-family: IBM Plex Sans, sans-serif;
  font-size: 0.875rem;
  box-sizing: border-box;
  padding: 6px;
  margin: 12px 0;
  min-width: 220px;
  border-radius: 12px;
  overflow: auto;
  outline: 0px;
  z-index: 200;
  background: ${theme.palette.mode === "dark" ? grey[900] : "#fff"};
  border: 1px solid ${theme.palette.mode === "dark" ? grey[700] : grey[200]};
  color: ${theme.palette.mode === "dark" ? grey[300] : grey[900]};
  box-shadow: 0px 4px 6px ${
    theme.palette.mode === "dark" ? "rgba(0,0,0, 0.50)" : "rgba(0,0,0, 0.05)"
  };
  @media (max-width: 480px) {
    width: 90px;
  }
  `
);

const StyledOption = styled(Option)(
  ({ theme }) => `
  list-style: none;
  padding: 8px;
  border-radius: 8px;
  cursor: default;

  &:last-of-type {
    border-bottom: none;
  }

  &.${optionClasses.selected} {
    background-color: ${theme.palette.mode === "dark" ? blue[900] : blue[100]};
    color: ${theme.palette.mode === "dark" ? blue[100] : blue[900]};
  }

  &.${optionClasses.highlighted} {
    background-color: ${theme.palette.mode === "dark" ? grey[800] : grey[100]};
    color: ${theme.palette.mode === "dark" ? grey[300] : grey[900]};
  }

  &.${optionClasses.highlighted}.${optionClasses.selected} {
    background-color: ${theme.palette.mode === "dark" ? blue[900] : blue[100]};
    color: ${theme.palette.mode === "dark" ? blue[100] : blue[900]};
  }

  &.${optionClasses.disabled} {
    color: ${theme.palette.mode === "dark" ? grey[700] : grey[400]};
  }

  &:hover:not(.${optionClasses.disabled}) {
    background-color: ${theme.palette.mode === "dark" ? grey[800] : grey[100]};
    color: ${theme.palette.mode === "dark" ? grey[300] : grey[900]};
  }
  `
);

const StyledPopper = styled(Popper)`
  z-index: 999;
`;
