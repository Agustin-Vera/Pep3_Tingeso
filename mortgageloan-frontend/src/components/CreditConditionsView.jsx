import { useEffect, useState } from "react";
import mortgageLoanCondition from "../services/mortgageLoanCondition";
import { Box, Typography } from "@mui/material";

const CreditConditionsView = ({ id, termChange }) => {
  const [type, setType] = useState("");
  const [maxTerm, setMaxTerm] = useState("");
  const [interestRate, setInterestRate] = useState("");
  const [maximumFinancing, setMaximumFinancing] = useState("");
  const [loanName, setLoanName] = useState("");

  const handleCreditType = (e) => {
    console.log("Tipo de Crédito:", e);
    setType(e);
    mortgageLoanCondition.get(e).then((response) => {
      console.log("Condiciones de Crédito:", response.data);
      setMaxTerm(response.data.maximumTerm);
      setInterestRate(response.data.interestRate);
      setMaximumFinancing(response.data.maximumFinancingAmount * 100);
      setLoanName(response.data.loanType);
      if (termChange) {
        termChange(response.data.maximumTerm);
      }
    });
  };

  useEffect(() => {
    if (id) {
      handleCreditType(id);
    }
  }, [id]);

  return (
    <>
      {type && (
        <>
          <Box
            sx={{
              bgcolor: "#fff", // Color de fondo
              display: "flex",
              boxShadow: 2,
              borderRadius: 2,
              flex: 1,
              gap: "4px",
              flexDirection: "column",
              width: "auto",
              height: "fit-content",
            }}
          >
            <h3>Tipo de Crédito: {loanName}</h3>
            <Typography>Tasa de Interés (anual): {interestRate}%</Typography>
            <Typography>
              Monto Máximo Financiamiento: {maximumFinancing}% del valor de la
              propiedad
            </Typography>
            <Typography>Plazo Máximo: {maxTerm} años</Typography>
          </Box>
        </>
      )}
    </>
  );
};
export default CreditConditionsView;
