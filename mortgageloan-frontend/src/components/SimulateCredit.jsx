import { useState } from "react";
import creditApplicationService from "../services/creditApplicationService";
import { Alert, Box, Button, Backdrop } from "@mui/material";
import CustomTextField from "./common/inputs/CustomTextField";
import CustomSelect from "./common/inputs/CustomSelect";
import SendIcon from "@mui/icons-material/Send";
import { useNavigate } from "react-router-dom";
import CreditConditionsView from "./CreditConditionsView";
import SeverityAlert from "./common/alerts/SeverityAlert";

const SimulateCredit = () => {
  const navigate = useNavigate();
  const [type, setType] = useState("");
  const [amount, setAmount] = useState("");
  const [term, setTerm] = useState("");
  const [monthlyInstallment, setMonthlyInstallment] = useState("");
  const [loanTerm, setLoanTerm] = useState("");

  const [severityAlert, setSeverityAlert] = useState(false);
  const [severity, setSeverity] = useState("");
  const [alertMessage, setAlertMessage] = useState("");

  const simulateCreditApplication = (e) => {
    e.preventDefault();

    if (amount > 0 && term > 0 && term <= loanTerm && type) {
      creditApplicationService
        .simulate(amount, term, type)
        .then((response) => {
          setMonthlyInstallment(Number(response.data).toLocaleString("es-CL"));
          setSeverityAlert(true);
          setSeverity("success");
          setAlertMessage(
            `Simulación exitosa. La cuota mensual es de $${Number(
              response.data
            ).toLocaleString("es-CL")} pesos.`
          );
        })
        .catch((error) => {
          console.error("Error al simular la solicitud de crédito", error);
          alert("Error al simular la solicitud de crédito");
        });
    } else {
      setSeverity("error");
      setSeverityAlert(true);
      setAlertMessage(
        "Error, ingrese valores válidos o complete los campos solicitados"
      );
    }
  };

  const creditOptions = [
    { value: 1, label: "Primera Vivienda" },
    { value: 2, label: "Segunda Vivienda" },
    { value: 3, label: "Propiedades Comerciales" },
    { value: 4, label: "Remodelación" },
  ];

  return (
    <>
      <h1>Simulación de Crédito</h1>
      <p>Complete los campos a continuación sin agregar puntos ni comas</p>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          gap: 2,
        }}
      >
        <Box sx={{ p: 1, flex: 1 }}>
          <CustomSelect
            label="Seleccione el Tipo de Crédito"
            value={type}
            onChange={(e) => setType(e.target.value)}
            options={creditOptions}
          />
          <CreditConditionsView id={type} termChange={setLoanTerm} />
        </Box>
        <Box
          component="form"
          noValidate
          autoComplete="off"
          sx={{ p: 1, flex: 1 }}
        >
          <CustomTextField
            label="Monto a Solicitar. Ej: 100.000.000"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            type="number"
            error={amount < 0}
          />
          <CustomTextField
            label="Plazo para pagar (años). Ej: 20"
            value={term}
            type="number"
            error={term < 0 || term > loanTerm}
            onChange={(e) => setTerm(e.target.value)}
          />
        </Box>
      </Box>
      <Button
        color="success"
        variant="contained"
        endIcon={<SendIcon />}
        onClick={simulateCreditApplication}
      >
        Simular
      </Button>

      <SeverityAlert
        open={severityAlert}
        onClose={() => setSeverityAlert(false)}
        severity={severity}
        message={alertMessage}
      ></SeverityAlert>
    </>
  );
};

export default SimulateCredit;
