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
      termChange(response.data.maximumTerm);
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
              p: 1, // Padding interno
              borderRadius: 2, // Bordes redondeados
              boxShadow: 2, // Sombra para darle profundidad
              maxWidth: "400px", // Ancho máximo
              margin: "auto", // Centrar horizontalmente
            }}
          >
            <h3>Tipo de Crédito: {loanName}</h3>
            <p>Tasa de Interés (anual): {interestRate}%</p>
            <p>
              Monto Máximo Financiamiento: {maximumFinancing}% del valor de la
              propiedad
            </p>
            <p>Plazo Máximo: {maxTerm} años</p>
          </Box>
        </>
      )}
    </>
  );
};
export default CreditConditionsView;
