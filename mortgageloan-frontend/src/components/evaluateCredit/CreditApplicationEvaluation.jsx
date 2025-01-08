import { useEffect, useState } from "react";
import creditApplicationService from "../../services/creditApplicationService";
import userService from "../../services/userService";
import R1InstallmentIncome from "./R1InstallmentIncome";
import R2ClientCreditHistory from "./R2ClientCreditHistory";
import R3SeniorityStability from "./R3SeniorityStability";
import R4DebtIncome from "./R4DebtIncome";
import R5MaxAmountFinancing from "./R5MaxAmountFinancing";
import R6ApplicantAge from "./R6ApplicantAge";
import R7SavingCapacity from "./R7SavingCapacity";
import DocumentsList from "../document/DocumentsList";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  Typography,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";

const CreditApplicationEvaluation = ({
  id,
  state,
  handleCreditApplicationState,
}) => {
  const [step, setStep] = useState(1);
  const [isApproved, setIsApproved] = useState(true);

  // Estados para los datos de la solicitud
  const [rutUser, setRutUser] = useState("");
  const [type, setType] = useState("");
  const [amount, setAmount] = useState("");
  const [term, setTerm] = useState("");

  const nextStep = () => setStep((prev) => prev + 1);

  const handleFailure = (mensaje) => {
    setIsApproved(false);
    alert(mensaje);
    handleCreditApplicationState(7, mensaje);
  };

  const initCreditApplication = () => {
    creditApplicationService
      .get(id)
      .then((creditApplication) => {
        console.log("Solicitud de crédito:", creditApplication.data);
        setRutUser(creditApplication.data.rutUser);
        setType(creditApplication.data.type);
        setAmount(creditApplication.data.amount);
        setTerm(creditApplication.data.term);
      })
      .catch((error) => {
        console.log("Error al obtener la solicitud de crédito", error);
      });
  };

  useEffect(() => {
    initCreditApplication();
  }, [rutUser]);

  return (
    <Box>
      {isApproved ? (
        <>
          {step === 1 && (
            <R1InstallmentIncome
              nextStep={nextStep}
              onFailure={handleFailure}
              id={id}
              amount={amount}
              term={term}
            />
          )}
          {step === 2 && (
            <R2ClientCreditHistory
              nextStep={nextStep}
              onFailure={handleFailure}
              id={id}
            />
          )}
          {step === 3 && (
            <R3SeniorityStability
              nextStep={nextStep}
              onFailure={handleFailure}
              id={id}
            />
          )}
          {step === 4 && (
            <R4DebtIncome
              nextStep={nextStep}
              onFailure={handleFailure}
              id={id}
            />
          )}
          {step === 5 && (
            <R5MaxAmountFinancing
              nextStep={nextStep}
              onFailure={handleFailure}
              id={id}
              amount={amount}
            />
          )}
          {step === 6 && (
            <R6ApplicantAge
              nextStep={nextStep}
              onFailure={handleFailure}
              id={id}
            />
          )}
          {step === 7 && (
            <R7SavingCapacity
              id={id}
              nextStep={nextStep}
              onFailure={handleFailure}
            />
          )}
          {step === 8 && (
            <>
              <p>La solicitud paso todas las reglas de negocio ... </p>
              <br />
              <Button
                color="success"
                variant="contained"
                endIcon={<CheckCircleOutlineIcon />}
                onClick={() => handleCreditApplicationState(4, "Pre-Aprobada")}
              >
                Aprobar Evaluación
              </Button>
            </>
          )}
        </>
      ) : (
        <p>La solicitud ha sido rechazada...</p>
      )}
    </Box>
  );
};
export default CreditApplicationEvaluation;
