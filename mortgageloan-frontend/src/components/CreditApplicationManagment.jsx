import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import creditApplicationService from "../services/creditApplicationService";
import CreditApplicationEvaluation from "./evaluateCredit/CreditApplicationEvaluation";
import DocumentsList from "./document/DocumentsList";
import statusService from "../services/statusService";
import RuleIcon from "@mui/icons-material/Rule";
import SendIcon from "@mui/icons-material/Send";
import { Box, Button, Divider } from "@mui/material";
import CreditConditionsView from "./CreditConditionsView";

const CreditApplicationManagment = () => {
  const { id } = useParams();
  const [state, setState] = useState("");
  const [step, setStep] = useState(1);
  const [rutUser, setRutUser] = useState("");
  const [type, setType] = useState("");
  const [amount, setAmount] = useState("");
  const [term, setTerm] = useState("");
  const [monthlyInstallment, setMonthlyInstallment] = useState("");
  const [totalCost, setTotalCost] = useState("");
  const [commission, setCommission] = useState("");
  const [creditLifeInsurance, setCreditLifeInsurance] = useState("");
  const [fireInsurance, setFireInsurance] = useState("");
  const [stateDescription, setStateDescription] = useState("");

  const [stateName, setStateName] = useState("");
  const [stateDescription2, setStateDescription2] = useState("");

  const handleCreditApplicationState = (state, stateDescription) => {
    console.log("Actualizando estado de la solicitud de crédito ...", state);
    setState(state);
    setStateDescription(stateDescription);
    const creditAplication = {
      id_application: id,
      rutUser: rutUser,
      type: type,
      amount: amount,
      term: term,
      state: state,
      monthlyInstallment: monthlyInstallment,
      totalCost: totalCost,
      commission: commission,
      creditLifeInsurance: creditLifeInsurance,
      fireInsurance: fireInsurance,
      stateDescription: stateDescription,
    };
    if (state === 4) {
      // Si pasa las reglas de evaluación se calculan los costos totales (condiciones)
      creditApplicationService
        .calculateTotalCosts(id)
        .then((response) => {
          console.log("Costo total del crédito:", response.data);
        })
        .catch((error) => {
          console.log("Error al calcular el costo total del crédito", error);
        });
    }
    console.log("Actualizando estado de la solicitud de crédito ...");
    creditApplicationService
      .update(creditAplication)
      .then((response) => {
        console.log("Solicitud de crédito actualizada:", response.data);
      })
      .catch((error) => {
        console.log("Error al actualizar la solicitud de crédito", error);
      });
  };

  useEffect(() => {
    console.log("Identificador de la solicitud de crédito: ", id);
    creditApplicationService
      .get(id)
      .then((response) => {
        console.log("Solicitud de crédito:", response.data);
        setRutUser(response.data.rutUser);
        setType(response.data.type);
        setAmount(response.data.amount);
        setTerm(response.data.term);
        setState(response.data.state);
        setMonthlyInstallment(response.data.monthlyInstallment);
        setTotalCost(response.data.totalCost);
        setCommission(response.data.commission);
        setCreditLifeInsurance(response.data.creditLifeInsurance);
        setFireInsurance(response.data.fireInsurance);
        setStateDescription(response.data.stateDescription);
      })
      .catch((error) => {
        console.log("Error al obtener la solicitud de crédito", error);
      });
    if (state) {
      statusService
        .get(state)
        .then((response) => {
          console.log("Estado de la solicitud de crédito:", response.data.name);
          setStateName(response.data.name);
          setStateDescription2(response.data.description);
        })
        .catch((error) => {
          console.log(
            "Error al obtener el estado de la solicitud de crédito",
            error
          );
        });
    }
  }, [id, state]);

  return (
    <Box>
      <h1>Administración - Solicitud Crediticia</h1>
      <Divider />
      <h2>Estado: {stateName}</h2>
      <h3>{stateDescription2}</h3>
      <Divider />
      <Box sx={{ display: "flex", gap: 2, flexDirection: "row" }}>
        <Box sx={{ p: 1, flex: 1 }}>
          <p>ID de solicitud: {id}</p>
          <p>Rut cliente: {rutUser}</p>
          <p>Monto: ${amount} pesos</p>
          <p>Plazo: {term} años</p>
        </Box>
        <Box sx={{ p: 1, flex: 1 }}>
          <DocumentsList idApplication={id} loanType={type} />
        </Box>
        <CreditConditionsView id={type} />
      </Box>

      <Divider />
      {state === 1 && (
        <>
          <p>Revisar documentación de solicitud crediticia del cliente</p>
          <br /> <br />
          <Button
            color="success"
            variant="contained"
            endIcon={<SendIcon />}
            onClick={() =>
              handleCreditApplicationState(state + 2, "En Evaluación")
            }
          >
            Aprobar
          </Button>
          <Button
            color="error"
            variant="contained"
            endIcon={<RuleIcon />}
            onClick={() =>
              handleCreditApplicationState(
                state + 1,
                "Pediente de Documentación"
              )
            }
          >
            Falta Documentación
          </Button>
        </>
      )}
      {state === 2 && (
        <>
          <p>Faltan documentos por subir ...</p>
          <br /> <br />
          <Button
            color="success"
            variant="contained"
            endIcon={<SendIcon />}
            onClick={() =>
              handleCreditApplicationState(state + 1, "En Evaluación")
            }
          >
            Aprobar
          </Button>
        </>
      )}
      {state === 3 && (
        <>
          <CreditApplicationEvaluation
            id={id}
            state={state}
            handleCreditApplicationState={handleCreditApplicationState}
          />
        </>
      )}
      {state === 4 && (
        <>
          <p>
            La solicitud fue evaluada y cumple con los criterios básicos del
            banco. Se ha hecho entrega de las condiciones iniciales del crédito
            al cliente.
          </p>
          <p>Pendiente a la respuesta del cliente ...</p>
        </>
      )}
      {state === 5 && (
        <>
          <p>El cliente ha aceptado las condiciones propuestas</p>
          <p>Revisión de detalles finales ...</p>
          <p>Emision de contratos y preparación de documentos legales ...</p>
          <button
            onClick={() =>
              handleCreditApplicationState(
                state + 1,
                "Aprobada, lista para el desembolso"
              )
            }
          >
            Aprobar Generación
          </button>
        </>
      )}
      {state === 6 && (
        <>
          <p>
            La solicitud es aprobada y está lista para el desembolso, se envía
            confirmación al cliente ...
          </p>
          <p>Programando la firma del contrato ...</p>
          <button
            onClick={() => handleCreditApplicationState(9, "En Desembolso")}
          >
            Aprobar Firma de Contratos
          </button>
        </>
      )}
      {state === 7 && (
        <>
          <p>
            La solicitud fue evaluada y, tras el análisis, no cumple con los
            requisitos establecidos por el banco
          </p>
          <p>Rut cliente: {rutUser}</p>
          <p>Tipo de solicitud: {type}</p>
          <p>Monto: {amount}</p>
          <p>Plazo: {term}</p>
        </>
      )}
      {state === 8 && (
        <>
          <p>
            Cancelada por el Cliente. El cliente ha decidido cancelar la
            solicitud antes de que esta sea aprobada ...
          </p>
        </>
      )}
      {state === 9 && (
        <>
          <p>
            La solicitud ha sido aprobada y se está ejecutando el proceso de
            desembolso del monto aprobado ...
          </p>
        </>
      )}
    </Box>
  );
};
export default CreditApplicationManagment;
