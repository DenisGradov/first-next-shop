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
import styles from "./accordionIndeterminateCheckbox.module.scss";

const AccordionIndeterminateCheckbox = () => {
  const filters = useFilters.getState();
  if (!filters.brands) return null;
  return (
    <>
      <Accordion className={styles.accordion}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography component="span">Бренди</Typography>
        </AccordionSummary>
        <AccordionDetails className={styles.accordionAccordionDetails}>
          <Typography component="span">
            <IndeterminateCheckbox id={"бренди"} />
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion className={styles.accordion}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography component="span">Категорії</Typography>
        </AccordionSummary>
        <AccordionDetails className={styles.accordionAccordionDetails}>
          <Typography component="span">
            <IndeterminateCheckbox id={"категорії"} />
          </Typography>
        </AccordionDetails>
      </Accordion>
    </>
  );
};

export default AccordionIndeterminateCheckbox;
