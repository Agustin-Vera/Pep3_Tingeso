import { useState } from "react";
import creditApplicationService from "../../services/creditApplicationService";
import CustomTextField from "../common/inputs/CustomTextField";
import { Box, Button } from "@mui/material";
import CalculateIcon from "@mui/icons-material/Calculate";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import ErrorIcon from "@mui/icons-material/Error";
import SeverityAlert from "../common/alerts/SeverityAlert";

const R4DebtIncome = (props) => {
  const [answerEvaluation, setAnswerEvaluation] = useState();
  const [income, setIncome] = useState("");
  const [debt, setDebt] = useState("");

  const [severityAlert, setSeverityAlert] = useState(false);
  const [severity, setSeverity] = useState("");
  const [alertMessage, setAlertMessage] = useState("");

  const evaluate = () => {
    if (income && income > 0 && debt && debt > 0) {
      creditApplicationService
        .evaluateR4(props.id, income, debt)
        .then((response) => {
          console.log("Respuesta: ", response);
          if (response.data.approved === true) {
            setAnswerEvaluation(response.data.message);
            setSeverity("success");
          } else {
            setAnswerEvaluation(response.data.message);
            setSeverity("error");
          }
          setAlertMessage(response.data.message);
          setSeverityAlert(true);
        });
    } else {
      setSeverity("error");
      setAlertMessage(
        "Error, ingrese valores válidos o complete los campos solicitados"
      );
      setSeverityAlert(true);
    }
  };

  return (
    <div>
      <h2>R4 - Relación Deuda / Ingreso</h2>
      <p>
        Ingrese los valores indicados para evaluar la relación, asegurese de no
        ingresar comas ni puntos en los campos númericos.
      </p>
      <Box sx={{ maxWidth: 300, margin: "auto" }}>
        <CustomTextField
          label="Deudas totales del cliente. Ej: 500.000"
          value={debt}
          onChange={(e) => setDebt(e.target.value)}
          type="number"
          error={debt < 0}
        />
        <CustomTextField
          label="Ingresos mensuales del cliente. Ej: 1.000.000"
          value={income}
          onChange={(e) => setIncome(e.target.value)}
          type="number"
          error={income < 0}
        />
      </Box>
      <br />
      <Button
        color="primary"
        variant="contained"
        endIcon={<CalculateIcon />}
        onClick={evaluate}
      >
        Evaluar
      </Button>
      <Button
        color="success"
        variant="contained"
        endIcon={<CheckCircleOutlineIcon />}
        onClick={props.nextStep}
      >
        Aprobar
      </Button>
      <Button
        color="error"
        variant="contained"
        endIcon={<ErrorIcon />}
        onClick={() =>
          props.onFailure("Rechazada, la cantidad de deudas no es soportada")
        }
      >
        Rechazar
      </Button>
      <SeverityAlert
        open={severityAlert}
        onClose={() => setSeverityAlert(false)}
        severity={severity}
        message={alertMessage}
      ></SeverityAlert>
    </div>
  );
};
export default R4DebtIncome;
