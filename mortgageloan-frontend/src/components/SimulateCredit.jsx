import { useState } from "react";
import creditApplicationService from "../services/creditApplicationService";
import mortgageLoanCondition from "../services/mortgageLoanCondition";
import {
  Alert,
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import CreditConditionsView from "./CreditConditionsView";
import SendIcon from "@mui/icons-material/Send";
import { useNavigate } from "react-router-dom";

const SimulateCredit = () => {
  const navigate = useNavigate();
  const [type, setType] = useState("");
  const [amount, setAmount] = useState("");
  const [term, setTerm] = useState("");
  const [monthlyInstallment, setMonthlyInstallment] = useState("");

  const simulateCreditApplication = (e) => {
    e.preventDefault();
    creditApplicationService
      .simulate(amount, term, type)
      .then((response) => {
        console.log("Simulación de Crédito:", response.data);
        setMonthlyInstallment(Number(response.data).toLocaleString("es-CL"));
      })
      .catch((error) => {
        console.log("Error al simular la solicitud de crédito", error);
        alert("Error al simular la solicitud de crédito");
      });
  };

  return (
    <>
      <h1>Simulación de Crédito</h1>
      <p>Complete los campos a continuación</p>
      <Box
        component="form"
        sx={{
          "& > :not(style)": {
            m: 1,
            width: "50%",
            bgcolor: "#fff",
            p: 1.5,
            borderRadius: 2,
          },
        }}
        noValidate
        autoComplete="off"
      >
        <TextField
          value={amount}
          id="filled-basic"
          label="Monto a Solicitar"
          variant="filled"
          onChange={(e) => setAmount(e.target.value)}
        />
        <TextField
          value={term}
          id="filled-basic"
          label="Plazo para pagar (años)"
          variant="filled"
          onChange={(e) => setTerm(e.target.value)}
        />
        <FormControl fullWidth variant="filled">
          <InputLabel id="demo-simple-select-filled-label">
            Seleccione el Tipo de Crédito
          </InputLabel>
          <Select
            labelId="demo-simple-select-filled-label"
            id="demo-simple-select-filled"
            value={type}
            onChange={(e) => {
              setType(e.target.value);
            }}
          >
            <MenuItem value="">
              <em>Selecciona una opción</em>
            </MenuItem>
            <MenuItem value={1}>Primera Vivienda</MenuItem>
            <MenuItem value={2}>Segunda Vivienda</MenuItem>
            <MenuItem value={3}>Propiedades Comerciales</MenuItem>
            <MenuItem value={4}>Remodelación</MenuItem>
          </Select>
        </FormControl>
      </Box>
      <br />

      <CreditConditionsView id={type} />

      <Button
        color="success"
        variant="contained"
        endIcon={<SendIcon />}
        onClick={(e) => simulateCreditApplication(e)}
      >
        Simular
      </Button>
      <br />
      {monthlyInstallment && (
        <>
          <Box
            sx={{
              position: "fixed", // Superposición
              top: "5%", // Posición desde la parte superior
              left: "50%", // Centrar horizontalmente
              transform: "translate(-50%, 0)", // Ajuste al centro
              zIndex: 1300, // Prioridad para estar encima
            }}
          >
            <Alert
              severity="success"
              action={
                <Button color="inherit" size="small">
                  Aceptar
                </Button>
              }
            >
              Simulación exitosa, la cuota mensual es de ${monthlyInstallment}{" "}
              pesos
            </Alert>
          </Box>
          <h2>Resultados</h2>
          <h3>Cuota mensual: ${monthlyInstallment} pesos</h3>
        </>
      )}
    </>
  );
};
export default SimulateCredit;
