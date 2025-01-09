import { useState } from "react";
import creditApplicationService from "../../services/creditApplicationService";
import { Button } from "@mui/material";
import CalculateIcon from "@mui/icons-material/Calculate";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import ErrorIcon from "@mui/icons-material/Error";
import SeverityAlert from "../common/alerts/SeverityAlert";
import CustomDateSelect from "../common/inputs/CustomDateSelect";

const R6ApplicantAge = ({ nextStep, onFailure, id }) => {
  const [answerEvaluation, setAnswerEvaluation] = useState("");

  const [birthDate, setBirthDate] = useState(null);

  const [severityAlert, setSeverityAlert] = useState(false);
  const [severity, setSeverity] = useState("");
  const [alertMessage, setAlertMessage] = useState("");

  const evaluate = () => {
    if (birthDate) {
      console.log("Evaluando R6");
      creditApplicationService
        .evaluateR6(id, birthDate)
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
        })
        .catch((error) => {
          console.log("Error al evaluar R6", error);
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
      <h2>R6 - Edad del Solicitante</h2>
      <p>
        Seleccione la fecha de nacimiento del solicitante (Puede revisar los
        documentos del cliente para encontrarla) ...
      </p>
      <CustomDateSelect handleDateChange={setBirthDate} />
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
        onClick={nextStep}
      >
        Aprobar
      </Button>
      <Button
        color="error"
        variant="contained"
        endIcon={<ErrorIcon />}
        onClick={() =>
          onFailure("Rechazada, la edad del usuario es muy elevada")
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
export default R6ApplicantAge;
