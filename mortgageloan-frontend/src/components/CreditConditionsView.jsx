import { useEffect, useState } from "react";
import mortgageLoanCondition from "../services/mortgageLoanCondition";
import { Box, Typography } from "@mui/material";

const CreditConditionsView = ({ id }) => {
  const [type, setType] = useState("");
  const [maxTerm, setMaxTerm] = useState("");
  const [interestRate, setInterestRate] = useState("");
  const [maximumFinancing, setMaximumFinancing] = useState("");

  const handleCreditType = (e) => {
    console.log("Tipo de Crédito:", e);
    setType(e);
    mortgageLoanCondition.get(e).then((response) => {
      console.log("Condiciones de Crédito:", response.data);
      setMaxTerm(response.data.maximumTerm);
      setInterestRate(response.data.interestRate);
      setMaximumFinancing(response.data.maximumFinancingAmount * 100);
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
              p: 3, // Padding interno
              borderRadius: 2, // Bordes redondeados
              boxShadow: 2, // Sombra para darle profundidad
              maxWidth: "400px", // Ancho máximo
              margin: "auto", // Centrar horizontalmente
            }}
          >
            <Typography variant="h6" component="h3" gutterBottom>
              Tasa de Interés (anual): {interestRate}%
            </Typography>
            <Typography variant="h6" component="h3" gutterBottom>
              Monto Máximo Financiamiento: {maximumFinancing}% del valor de la
              propiedad
            </Typography>
            <Typography variant="h6" component="h3">
              Plazo Máximo: {maxTerm} años
            </Typography>
          </Box>
        </>
      )}
    </>
  );
};
export default CreditConditionsView;
