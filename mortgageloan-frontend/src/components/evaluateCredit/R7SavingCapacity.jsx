import { useState } from "react";
import creditApplicationService from "../../services/creditApplicationService";
import R71MinimumBalance from "./R71MinimumBalance";
import R72SavingsHistory from "./R72SavingsHistory";
import R73PeriodicDeposits from "./R73PeriodicDeposits";
import R74BalanceSeniority from "./R74BalanceSeniority";
import CustomTextField from "../common/inputs/CustomTextField";
import SeverityAlert from "../common/alerts/SeverityAlert";
import { Box, Button } from "@mui/material";
import CalculateIcon from "@mui/icons-material/Calculate";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import ErrorIcon from "@mui/icons-material/Error";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

const R7SavingCapacity = ({ nextStep, onFailure, id }) => {
  const [answerEvaluation, setAnswerEvaluation] = useState("");
  const [balance, setBalance] = useState(""); // saldo
  const [income, setIncome] = useState(""); // ingreso
  const [savings, setSavings] = useState(Array(12).fill("")); // ahorros
  const [deposits, setDeposits] = useState(Array(12).fill("")); // depositos
  const [date, setDate] = useState(""); // fecha creacion cuenta ahorros
  console.log("Date en padre: ", date);
  console.log("Savings en padre: ", savings);
  console.log("Deposits en padre: ", deposits);
  console.log("Balance en padre: ", balance);
  console.log("Income en padre: ", income);

  const [severityAlert, setSeverityAlert] = useState(false);
  const [severity, setSeverity] = useState("");
  const [alertMessage, setAlertMessage] = useState("");

  const [step, setStep] = useState(0);

  const evaluate = () => {
    if (
      income &&
      balance &&
      savings &&
      deposits &&
      date &&
      income > 0 &&
      balance > 0 &&
      savings.every((saving) => saving !== "" && saving > 0) &&
      deposits.every((deposit) => deposit !== "" && deposit > 0)
    ) {
      const savingsCapacity = {
        income: parseFloat(income) || 0,
        balance: parseFloat(balance) || 0,
        savings: savings.map((saving) => parseFloat(saving) || 0),
        deposits: deposits.map((deposit) => parseFloat(deposit) || 0),
        date: date,
      };
      console.log("Identificador: ", id);
      creditApplicationService
        .evaluateR7(id, savingsCapacity)
        .then((response) => {
          console.log("Capacidad de Ahorro", response.data);
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
          console.log("Error al evaluar la Capacidad de Ahorro", error);
        });
    } else {
      setSeverity("error");
      setAlertMessage(
        "Error, ingrese valores válidos o complete los campos solicitados"
      );
      setSeverityAlert(true);
    }
  };

  const nextStepInternal = (step) => {
    if (step <= 0) {
      setStep(0);
    } else if (step >= 4) {
      setStep(4);
    } else {
      setStep(step);
    }
  };

  return (
    <div>
      <h1>R7 - Capacidad de Ahorro</h1>
      <p>
        Ingrese los valores indicados, asegurese de no poner puntos ni comas en
        las entradas númericas.
      </p>
      <Box sx={{ maxWidth: 600, margin: "auto", flexDirection: "column" }}>
        {step === 0 && (
          <CustomTextField
            label="Ingreso mensual del cliente. Ej: 2.000.000"
            value={income}
            onChange={(e) => setIncome(e.target.value)}
            type="number"
            error={income < 0}
          />
        )}
        {step === 1 && (
          <R71MinimumBalance
            id={id}
            balance={balance}
            setBalance={setBalance}
          />
        )}
        {step === 2 && (
          <R72SavingsHistory savings={savings} setSavings={setSavings} />
        )}
        {step === 3 && (
          <R73PeriodicDeposits deposits={deposits} setDeposits={setDeposits} />
        )}
        {step === 4 && (
          <>
            <R74BalanceSeniority setDate={setDate} />
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
                onFailure("Rechazada, la capacidad de ahorro es insuficiente")
              }
            >
              Rechazar
            </Button>
          </>
        )}
        <SeverityAlert
          open={severityAlert}
          onClose={() => setSeverityAlert(false)}
          severity={severity}
          message={alertMessage}
        ></SeverityAlert>
        <Box>
          <br /> <br />
          <Button
            color="primary"
            variant="contained"
            endIcon={<ArrowBackIcon />}
            onClick={() => nextStepInternal(step - 1)}
          ></Button>
          <Button
            color="primary"
            variant="contained"
            endIcon={<ArrowForwardIcon />}
            onClick={() => nextStepInternal(step + 1)}
          ></Button>
        </Box>
      </Box>
    </div>
  );
};

export default R7SavingCapacity;
