import { useState } from "react";
import creditApplicationService from "../../services/creditApplicationService";
import { Box, Button } from "@mui/material";
import CustomTextField from "../common/inputs/CustomTextField";
import CalculateIcon from "@mui/icons-material/Calculate";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import ErrorIcon from "@mui/icons-material/Error";
import SeverityAlert from "../common/alerts/SeverityAlert";

const R5MaxAmountFinancing = (props) => {
  const [answerEvaluation, setAnswerEvaluation] = useState("");
  const [propertyValue, setPropertyValue] = useState("");

  const [severityAlert, setSeverityAlert] = useState(false);
  const [severity, setSeverity] = useState("");
  const [alertMessage, setAlertMessage] = useState("");

  const evaluate = () => {
    if (propertyValue && propertyValue > 0) {
      creditApplicationService
        .evaluateR5(props.id, propertyValue)
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
      <h2>R5 - Monto Máximo de Financiamiento</h2>
      <p>Monto Solicitado: ${Number(props.amount).toLocaleString("es-CL")}</p>
      <p>
        Ingrese los valores indicados para la evaluación, asegurese de no
        ingresar comas ni puntos en los campos númericos.
      </p>
      <p>
        El valor de la propiedad puede puede ser encontrado en los documentos
        del cliente ...
      </p>
      <Box sx={{ maxWidth: 300, margin: "auto" }}>
        <CustomTextField
          label="Valor de la Propiedad. Ej: 80.000.000"
          value={propertyValue}
          onChange={(e) => setPropertyValue(e.target.value)}
          type="number"
          error={propertyValue < 0}
        />
      </Box>
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
          props.onFailure(
            "Rechazada, el monto solicitado es mayor al permitido"
          )
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
export default R5MaxAmountFinancing;
