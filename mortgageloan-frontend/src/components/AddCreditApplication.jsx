import { useEffect, useState } from "react";
import userService from "../services/userService";
import creditApplicationService from "../services/creditApplicationService";
import { useNavigate } from "react-router-dom";
import documentService from "../services/documentService";
import FirstHome from "./formsCreditApplication/FirstHome";
import SecondHome from "./formsCreditApplication/SecondHome";
import CommercialProperty from "./formsCreditApplication/CommercialProperty";
import Remodeling from "./formsCreditApplication/Remodeling";
import { Box, Button } from "@mui/material";
import CustomTextField from "./common/inputs/CustomTextField";
import CustomFileField from "./common/inputs/CustomFileField";
import CustomSelect from "./common/inputs/CustomSelect";
import SendIcon from "@mui/icons-material/Send";
import CreditConditionsView from "./CreditConditionsView";
import SeverityAlert from "./common/alerts/SeverityAlert";

const AddCreditApplication = () => {
  const [rutUser, setRutUser] = useState("");
  const [type, setType] = useState("");
  const [amount, setAmount] = useState("");
  const [term, setTerm] = useState("");
  const [loanTerm, setLoanTerm] = useState("");

  const [identificationDoc, setIdentificationDoc] = useState("");
  const [appraisalCertificateDoc, setAppraisalCertificateDoc] = useState("");
  const [proofIncomeDoc, setProofIncomeDoc] = useState("");
  const [creditHistoryDoc, setCreditHistoryDoc] = useState("");
  const [firstHomeDeedDoc, setFirstHomeDeedDoc] = useState("");
  const [financialStatusBusinessDoc, setFinancialStatusBusinessDoc] =
    useState("");
  const [businessPlanDoc, setBusinessPlanDoc] = useState("");
  const [renovationBudgetDoc, setRenovationBudgetDoc] = useState("");

  const navigate = useNavigate();
  const [severityAlert, setSeverityAlert] = useState(false);
  const [severity, setSeverity] = useState("");
  const [alertMessage, setAlertMessage] = useState("");
  const [idGenerated, setIdGenerated] = useState("");

  const saveCreditApplication = (e) => {
    e.preventDefault();

    const creditApplication = {
      rutUser,
      type,
      amount,
      term,
    };
    if (
      rutUser &&
      type &&
      amount &&
      term &&
      term <= loanTerm &&
      appraisalCertificateDoc &&
      proofIncomeDoc
    ) {
      creditApplicationService
        .create(creditApplication)
        .then((response) => {
          console.log("Solicitud Crediticia creada", response.data);
          const formData = new FormData();
          formData.append("idApplication", response.data.id_application);
          formData.append("documents", identificationDoc);
          formData.append("documentType", 1);
          formData.append("documents", proofIncomeDoc);
          formData.append("documentType", 2);
          formData.append("documents", appraisalCertificateDoc);
          formData.append("documentType", 3);
          if (type === 1) {
            formData.append("documents", creditHistoryDoc);
            formData.append("documentType", 4);
          } else if (type === 2) {
            formData.append("documents", creditHistoryDoc);
            formData.append("documentType", 4);
            formData.append("documents", firstHomeDeedDoc);
            formData.append("documentType", 5);
          } else if (type === 3) {
            formData.append("documents", financialStatusBusinessDoc);
            formData.append("documentType", 6);
            formData.append("documents", businessPlanDoc);
            formData.append("documentType", 7);
          } else if (type === 4) {
            formData.append("documents", renovationBudgetDoc);
            formData.append("documentType", 8);
          }
          console.log("Documentos a subir", formData);
          console.log("Documentos a subir", formData.getAll("documents"));
          documentService
            .create(formData)
            .then((response) => {
              console.log("Documento subido", response.data);
              setSeverityAlert(true);
              setSeverity("success");
              setAlertMessage("Solicitud de crédito creada con éxito");
              /*navigate(
                `/creditApplication/list/${rutUser}/${formData.get(
                  "idApplication"
                )}`
              );*/
              setIdGenerated(formData.get("idApplication"));
            })
            .catch((error) => {
              console.log("Error al intentar subir los documentos", error);
              setAlertMessage("Error al intentar subir los documentos");
              setSeverity("error");
              setSeverityAlert(true);
            });
        })
        .catch((error) => {
          console.log(
            "Error al intentar crear una solicitud crediticia",
            error
          );
          setSeverity("error");
          setSeverityAlert(true);
          setAlertMessage(error.response.data);
        });
    } else {
      setSeverity("error");
      setSeverityAlert(true);
      setAlertMessage(
        "Error, ingrese valores válidos o complete los campos solicitados"
      );
      console.log("Ingresar los campos faltantes");
    }
  };
  const creditOptions = [
    { value: 1, label: "Primera Vivienda" },
    { value: 2, label: "Segunda Vivienda" },
    { value: 3, label: "Propiedades Comerciales" },
    { value: 4, label: "Remodelación" },
  ];

  useEffect(() => {}, []);
  return (
    <>
      <h1>Solicitud de Crédito</h1>
      <Box sx={{ display: "flex", flexDirection: "row" }}>
        <Box sx={{ width: "50%" }}>
          <CustomSelect
            label="Seleccione el Tipo de Crédito"
            value={type}
            onChange={(e) => setType(e.target.value)}
            options={creditOptions}
          />
        </Box>
        <CreditConditionsView id={type} termChange={setLoanTerm} />
      </Box>
      <Box>
        <h2>Información Personal</h2>
        <Box sx={{ display: "flex", flexDirection: "column" }}>
          <Box sx={{ display: "flex", gap: 2 }}>
            <CustomTextField
              label="Ingrese su rut. Ej: 12345678-9"
              value={rutUser}
              onChange={(e) => setRutUser(e.target.value)}
              type="text"
              //error={amount < 0}
            />
            <CustomFileField
              id="archivo"
              name="identificationDoc"
              label="Ingrese Documento de Identificación Personal:"
              onChange={setIdentificationDoc}
            />
          </Box>
          <Box sx={{ display: "flex", gap: 2 }}>
            <CustomTextField
              label="Ingrese el monto a solicitar. Ej: 100.000.000"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              type="number"
              error={amount < 0}
            />
            <CustomFileField
              id="archivo"
              name="proofIncomeDoc"
              label="Ingrese su Comprobante de Ingresos:"
              onChange={setProofIncomeDoc}
            />
          </Box>
          <Box sx={{ display: "flex", gap: 2 }}>
            <br />
            <CustomTextField
              label="Ingrese el Plazo (en años). Ej: 20"
              value={term}
              onChange={(e) => setTerm(e.target.value)}
              type="number"
              error={term < 0 || term > loanTerm}
            />
            <CustomFileField
              id="archivo"
              name="appraisalCertificateDoc"
              label="Ingrese su Certificado de Avalúo:"
              onChange={setAppraisalCertificateDoc}
            />
            <br />
          </Box>
          <Box sx={{ display: "flex", gap: 2 }}>
            {type === 1 && (
              <>
                <FirstHome setCreditHistoryDoc={setCreditHistoryDoc} />
              </>
            )}
            {type === 2 && (
              <>
                <SecondHome
                  setCreditHistoryDoc={setCreditHistoryDoc}
                  setFirstHomeDeedDoc={setFirstHomeDeedDoc}
                />
              </>
            )}
            {type === 3 && (
              <>
                <CommercialProperty
                  setFinancialStatusBusinessDoc={setFinancialStatusBusinessDoc}
                  setBusinessPlanDoc={setBusinessPlanDoc}
                />
              </>
            )}
            {type === 4 && (
              <>
                <Remodeling setRenovationBudgetDoc={setRenovationBudgetDoc} />
              </>
            )}
          </Box>
        </Box>
      </Box>
      <br />
      <Button
        color="success"
        variant="contained"
        endIcon={<SendIcon />}
        onClick={saveCreditApplication}
      >
        Enviar
      </Button>

      {severity === "success" && (
        <SeverityAlert
          open={severityAlert}
          onClose={() =>
            navigate(`/creditApplication/list/${rutUser}/${idGenerated}`)
          }
          severity={severity}
          message={alertMessage}
        ></SeverityAlert>
      )}
      {severity === "error" && (
        <SeverityAlert
          open={severityAlert}
          onClose={() => setSeverityAlert(false)}
          severity={severity}
          message={alertMessage}
        ></SeverityAlert>
      )}
    </>
  );
};

export default AddCreditApplication;
