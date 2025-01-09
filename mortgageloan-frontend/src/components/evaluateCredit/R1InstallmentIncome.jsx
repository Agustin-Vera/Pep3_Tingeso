import { useEffect, useState } from "react";
import creditApplicationService from "../../services/creditApplicationService";
import DocumentsView from "../document/DocumentsView";
import { Box, Button } from "@mui/material";
import ErrorIcon from "@mui/icons-material/Error";
import CustomTextField from "../common/inputs/CustomTextField";
import CalculateIcon from "@mui/icons-material/Calculate";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import SeverityAlert from "../common/alerts/SeverityAlert";

const R1InstallmentIncome = (props) => {
  const [answerEvaluation, setAnswerEvaluation] = useState();
  //const [answerStatus, setAnswerStatus] = useState();
  const [income, setIncome] = useState("");

  const [severityAlert, setSeverityAlert] = useState(false);
  const [severity, setSeverity] = useState("");
  const [alertMessage, setAlertMessage] = useState("");

  const evaluate = () => {
    if (income && income > 0) {
      creditApplicationService.evaluateR1(props.id, income).then((response) => {
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
      <h2>R1 - Cuota / Ingreso</h2>
      <p>
        Monto a pedir: ${Number(props.amount).toLocaleString("es-CL")} pesos
      </p>
      <p>Plazo para pagar: {props.term} años</p>
      <p>
        Ingrese el ingreso mensual del cliente, sin puntos ni comas en los
        campos númericos.
      </p>
      <Box sx={{ maxWidth: 300, margin: "auto" }}>
        <CustomTextField
          label="Ingresos mensuales del cliente. Ej: 1.000.000"
          value={income}
          onChange={(e) => setIncome(e.target.value)}
          type="number"
          error={income < 0}
        />
      </Box>
      <br /> <br />
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
          props.onFailure("Rechazada, la capacidad de pago es insuficiente")
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
export default R1InstallmentIncome;
