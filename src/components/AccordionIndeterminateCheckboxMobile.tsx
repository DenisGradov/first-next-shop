import React from "react";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import IndeterminateCheckbox from "./IndeterminateCheckbox";

interface CheckBox {
  brandName: string;
  isChecked: boolean;
}
type props = {
  brands: string[];
  categories: string[];
  checkBox: any;
  product: any;
  setCheckBox: React.Dispatch<React.SetStateAction<any>>;
};

const AccordionIndeterminateCheckboxMobile: React.FC<props> = ({
  brands,
  categories,
  product,
  checkBox,
  setCheckBox,
}) => {
  if (brands.length === 0) return null;
  return (
    <>
      <Accordion style={{ marginBottom: "20px", width: "200px" }}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography component="span">Бренди</Typography>
        </AccordionSummary>
        <AccordionDetails style={{ maxHeight: "150px", overflowY: "auto" }}>
          <Typography component="span">
            <IndeterminateCheckbox
              id={"бренди"}
              checkBox={checkBox}
              setCheckBox={setCheckBox}
            />
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion style={{ marginBottom: "150px", width: "200px" }}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography component="span">Категорії</Typography>
        </AccordionSummary>
        <AccordionDetails style={{ maxHeight: "150px", overflowY: "auto" }}>
          <Typography component="span">
            <IndeterminateCheckbox
              id={"категорії"}
              checkBox={checkBox}
              setCheckBox={setCheckBox}
            />
          </Typography>
        </AccordionDetails>
      </Accordion>
    </>
  );
};

export default AccordionIndeterminateCheckboxMobile;
