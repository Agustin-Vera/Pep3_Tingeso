import { useState } from "react";
import creditApplicationService from "../../services/creditApplicationService";
import { Button } from "@mui/material";
import CalculateIcon from "@mui/icons-material/Calculate";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import ErrorIcon from "@mui/icons-material/Error";
import SeverityAlert from "../common/alerts/SeverityAlert";

const R6ApplicantAge = ({ nextStep, onFailure, id }) => {
  const [answerEvaluation, setAnswerEvaluation] = useState("");
  const [birthday, setBirthday] = useState("");
  const [birthMonth, setBirthMonth] = useState("");
  const [birthYear, setBirhtYear] = useState("");

  const [severityAlert, setSeverityAlert] = useState(false);
  const [severity, setSeverity] = useState("");
  const [alertMessage, setAlertMessage] = useState("");

  const evaluate = () => {
    console.log("Evaluando R6");
    const birthDate = new Date(birthYear, birthMonth - 1, birthday);
    const formattedBirthDate = birthDate.toISOString().split("T")[0];
    creditApplicationService
      .evaluateR6(id, formattedBirthDate)
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
  };

  return (
    <div>
      <h2>R6 - Edad del Solicitante</h2>
      <div>
        <label>Ingrese el día de nacimiento del cliente:</label>
        <input
          type="text"
          value={birthday}
          onChange={(e) => setBirthday(e.target.value)}
        />
      </div>
      <div>
        <label>Ingrese el mes de nacimiento del cliente</label>
        <input
          type="text"
          value={birthMonth}
          onChange={(e) => setBirthMonth(e.target.value)}
        />
      </div>
      <div>
        <label>Ingrese el año de nacimiento del cliente:</label>
        <input
          type="text"
          value={birthYear}
          onChange={(e) => setBirhtYear(e.target.value)}
        />
      </div>
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
