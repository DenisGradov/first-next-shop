import * as React from "react";
import { useInput } from "@mui/base/useInput";
import { styled } from "@mui/system";
import { unstable_useForkRef as useForkRef } from "@mui/utils";

const CustomInput = React.forwardRef(function CustomInput(
  props: React.InputHTMLAttributes<HTMLInputElement>,
  ref: React.ForwardedRef<HTMLInputElement>
) {
  const { getRootProps, getInputProps } = useInput(props);

  const inputProps = getInputProps();

  // Make sure that both the forwarded ref and the ref returned from the getInputProps are applied on the input element
  inputProps.ref = useForkRef(inputProps.ref, ref);

  return (
    <div {...getRootProps()}>
      <StyledInputElement {...props} {...inputProps} />
    </div>
  );
});
interface InputProps {
  searchInput: string;
  setSearchInput: (value: string) => void;
}
const Input: React.FC<InputProps> = ({ searchInput, setSearchInput }) => {
  return (
    <CustomInput
      aria-label="Search Input"
      placeholder="Я шукаю…"
      value={searchInput}
      onChange={(e) => setSearchInput(e.target.value)}
    />
  );
};
export default Input;

const blue = {
  100: "#8a07fc",
  200: "#8a07fc",
  400: "#8a07fc",
  500: "#8a07fc",
  600: "#8a07fc",
};

const grey = {
  50: "#F3F6F9",
  100: "#E7EBF0",
  200: "#E0E3E7",
  300: "#CDD2D7",
  400: "#B2BAC2",
  500: "#A0AAB4",
  600: "#6F7E8C",
  700: "#3E5060",
  800: "#2D3843",
  900: "#1A2027",
};

const StyledInputElement = styled("input")(
  ({ theme }) => `
  width: 320px;
  
  @media (max-width: 750px) {
    width: 200px;
  }
  @media (max-width: 580px) {
    width: 100px;
  }
  @media (max-width: 480px) {
    width: 100px; 
  }
  font-family: IBM Plex Sans, sans-serif;
  font-size: 0.875rem;
  font-weight: 400;
  line-height: 1.5;
  padding: 7px 12px;
  border-radius: 8px;
  border-top-right-radius: 0px;
  border-bottom-right-radius: 0px;
  color: ${theme.palette.mode === "dark" ? grey[300] : grey[900]};
  background: ${theme.palette.mode === "dark" ? grey[900] : "#fff"};
  border: 1px solid ${theme.palette.mode === "dark" ? grey[700] : grey[200]};
  box-shadow: 0px 2px 2px ${
    theme.palette.mode === "dark" ? grey[900] : grey[50]
  };

  &:hover {
    border-color: #8a07fc;
  }

  &:focus {
    border-color:#8a07fc;
    box-shadow: 0 0 0 1px #8a07fc;
  }

  // firefox
  &:focus-visible {
    outline: 0;
  }
`
);
