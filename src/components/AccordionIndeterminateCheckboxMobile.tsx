"use client";
import React from "react";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import IndeterminateCheckbox from "./IndeterminateCheckbox";
import { useFilters } from "@/states/filters";

const AccordionIndeterminateCheckboxMobile = () => {
  const filters = useFilters.getState();
  if (!filters.brands) return null;
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
            <IndeterminateCheckbox id={"бренди"} />
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
            <IndeterminateCheckbox id={"категорії"} />
          </Typography>
        </AccordionDetails>
      </Accordion>
    </>
  );
};

export default AccordionIndeterminateCheckboxMobile;
