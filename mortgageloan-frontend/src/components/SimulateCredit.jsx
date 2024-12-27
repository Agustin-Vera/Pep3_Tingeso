import { useState } from "react";
import creditApplicationService from "../services/creditApplicationService";
import mortgageLoanCondition from "../services/mortgageLoanCondition";
import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import CreditConditionsView from "./CreditConditionsView";

const SimulateCredit = () => {
  const [type, setType] = useState("");
  const [amount, setAmount] = useState("");
  const [term, setTerm] = useState("");
  const [monthlyInstallment, setMonthlyInstallment] = useState("");
  const [maxTerm, setMaxTerm] = useState("");
  const [interestRate, setInterestRate] = useState("");
  const [maximumFinancing, setMaximumFinancing] = useState("");

  const simulateCreditApplication = (e) => {
    e.preventDefault();
    creditApplicationService
      .simulate(amount, term, type)
      .then((response) => {
        console.log("Simulación de Crédito:", response.data);
        setMonthlyInstallment(response.data);
      })
      .catch((error) => {
        console.log("Error al simular la solicitud de crédito", error);
        alert("Error al simular la solicitud de crédito");
      });
  };

  const handleCreditType = (e) => {
    setType(e);
    mortgageLoanCondition.get(e).then((response) => {
      console.log("Condiciones de Crédito:", response.data);
      setMaxTerm(response.data.maximumTerm);
      setInterestRate(response.data.interestRate);
      setMaximumFinancing(response.data.maximumFinancingAmount);
    });
  };

  return (
    <>
      <h1>Simulación de Crédito</h1>
      <Box
        component="form"
        sx={{ "& > :not(style)": { m: 1, width: "50%" } }}
        noValidate
        autoComplete="off"
      >
        <TextField
          id="filled-basic"
          label="Monto a Solicitar"
          variant="filled"
          sx={{
            bgcolor: "#fff",
            p: 1.5,
            borderRadius: 2,
          }}
          onChange={(e) => setAmount(e.target.value)}
        />
        <TextField
          id="filled-basic"
          label="Plazo para pagar (años)"
          variant="filled"
          sx={{
            bgcolor: "#fff",
            p: 1.5,
            borderRadius: 2,
          }}
          onChange={(e) => setTerm(e.target.value)}
        />
      </Box>

      <br />
      <Box sx={{ bgcolor: "#fff", p: 1.5, borderRadius: 2 }}>
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Age</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            //value={age}
            label="Age"
            onChange={(e) => {
              handleCreditType(e.target.value);
            }}
          >
            <MenuItem value={1}>Primera Vivienda</MenuItem>
            <MenuItem value={2}>Segunda Vivienda</MenuItem>
            <MenuItem value={30}>Thirty</MenuItem>
          </Select>
        </FormControl>
      </Box>

      <br />
      <div>
        <label>Tipo de Crédito:</label>
        <select
          id="dropdown"
          onChange={(e) => {
            handleCreditType(e.target.value);
          }}
        >
          <option value="">Selecciona el Tipo de Crédito</option>
          <option value={1}>Primera Vivienda</option>
          <option value={2}>Segunda Vivienda</option>
          <option value={3}>Propiedades Comerciales</option>
          <option value={4}>Remodelación</option>
        </select>
      </div>
      <br />
      <CreditConditionsView id={type} />

      {type && (
        <>
          <p>Tasa de Interés (anual): {interestRate}%</p>
          <p>
            Monto Máximo Financiamiento: {maximumFinancing * 100}% del valor de
            la propiedad
          </p>
          <p>Plazo Máximo: {maxTerm} años</p>
        </>
      )}

      <Button variant="contained">Contained</Button>
      <div className="col-12">
        <button
          type="submit"
          className="btn btn-primary"
          onClick={(e) => simulateCreditApplication(e)}
        >
          Simular
        </button>
      </div>
      <br />
      {monthlyInstallment && (
        <>
          <h2>Resultados</h2>
          <p>
            Cuota mensual: ${Number(monthlyInstallment).toLocaleString("es-CL")}{" "}
            pesos
          </p>
          <p>
            Monto Solicitado: ${Number(amount).toLocaleString("es-CL")} pesos
          </p>
          <p>Plazo para Pagar: {term} años</p>
        </>
      )}
    </>
  );
};
export default SimulateCredit;
