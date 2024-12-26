import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import creditApplicationService from "../services/creditApplicationService";
import mortgageLoanCondition from "../services/mortgageLoanCondition";
import DocumentsList from "./document/DocumentsList";
import statusService from "../services/statusService";

const CreditApplicationView = () => {
  const { userRut } = useParams();
  const { id } = useParams();
  const [rutUser, setRutUser] = useState("");
  const [type, setType] = useState("");
  const [amount, setAmount] = useState("");
  const [term, setTerm] = useState("");
  const [state, setState] = useState("");
  const [monthlyInstallment, setMonthlyInstallment] = useState("");
  const [totalCost, setTotalCost] = useState("");
  const [commission, setCommission] = useState("");
  const [creditLifeInsurance, setCreditLifeInsurance] = useState("");
  const [fireInsurance, setFireInsurance] = useState("");
  const [stateDescription, setStateDescription] = useState("");
  const [loanType, setLoanType] = useState("");
  const [interestRate, setInterestRate] = useState("");

  const [stateName, setStateName] = useState("");
  const [stateDescription2, setStateDescription2] = useState("");

  const handleSubmit = (state, stateDescription) => {
    setState(state);
    setStateDescription(stateDescription);
    const creditAplication = {
      id_application: id,
      rutUser: userRut,
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

    creditApplicationService
      .update(creditAplication)
      .then((response) => {
        console.log("Solicitud de crédito actualizada:", response.data);
      })
      .catch((error) => {
        console.log("Error al enviar la solicitud de crédito", error);
      });
  };

  useEffect(() => {
    creditApplicationService
      .get(id)
      .then((response) => {
        console.log("Solicitud de crédito:", response.data);
        setRutUser(response.data.rutUser);
        setType(response.data.type);
        setAmount(response.data.amount);
        setTerm(response.data.term);
        setState(response.data.state);
        setMonthlyInstallment(Math.round(response.data.monthlyInstallment));
        setTotalCost(Math.round(response.data.totalCost));
        setCommission(Math.round(response.data.commission));
        setCreditLifeInsurance(Math.round(response.data.creditLifeInsurance));
        setFireInsurance(Math.round(response.data.fireInsurance));
        setStateDescription(response.data.stateDescription);
      })
      .catch((error) => {
        console.log("Error al obtener la solicitud de crédito", error);
      });
    if (type) {
      mortgageLoanCondition
        .get(type)
        .then((response) => {
          console.log("Condiciones de Crédito:", response.data);
          setLoanType(response.data.loanType);
          setInterestRate(response.data.interestRate);
        })
        .catch((error) => {
          console.log("Error al obtener las condiciones de crédito", error);
        });
    }
    if (state) {
      statusService
        .get(state)
        .then((response) => {
          console.log("Estado de la solicitud:", response.data.name);
          setStateName(response.data.name);
          setStateDescription2(response.data.description);
        })
        .catch((error) => {
          console.log("Error al obtener el estado", error);
        });
    }
  }, [state, type]);

  return (
    <>
      <h1>Seguimiento - Solicitud Crediticia</h1>
      <h2>Estado: {stateDescription}</h2>
      <h2>ESTADO: {stateName}</h2>
      <h3>Descripción del Estado: {stateDescription2}</h3>
      <br />
      <p>Rut del Cliente: {userRut}</p>
      <p>ID de Solicitud: {id}</p>
      <p>
        Tipo de Solicitud: {type} - {loanType}
      </p>
      <p>Monto Solicitado: ${amount} pesos</p>
      <p>Plazo para Pagar: {term} años</p>
      <br />

      {state === 4 && (
        <>
          <p>El cliente debe dar la aprobación de los términos ... </p> <br />
          <h3>Terminos de la Solicitud Créditicia</h3>
          <p>Tasa de Interés Anual: {interestRate}%</p>
          <p>Cuota Mensual Sin Seguros: ${monthlyInstallment} pesos</p>
          <p>Seguro de Desgravamen: ${creditLifeInsurance} pesos</p>
          <p>Seguro de Incendio: ${fireInsurance} pesos</p>
          <p>Los seguros se le suman a la cuota mensual ...</p>
          <p>
            Comisiones por Administración (solo un pago): ${commission} pesos
          </p>
          <p>Costo Total Final del Crédito: ${totalCost} pesos</p>
          <br />
          <button
            onClick={() =>
              handleSubmit(
                state + 1,
                "Aprobada, el cliente aceptó los términos y condiciones"
              )
            }
          >
            Aceptar Condiciones
          </button>
        </>
      )}
      {state === 5 && (
        <>
          <p>
            El cliente ha aceptado las condiciones propuestas, y la solicitud se
            encuentra en proceso de aprobación final ...
          </p>
        </>
      )}
      {state === 6 && (
        <>
          <p>
            Recibiendo confirmación y programación de fecha de contrato ...{" "}
          </p>
        </>
      )}
      {state === 7 && (
        <>
          <p>Explicación del Rechazo</p>
        </>
      )}
      {state === 8 && (
        <>
          <p>Usted rechazó la solicitud ...</p>
        </>
      )}
      {state === 9 && (
        <>
          <p>El prestamo solicitado esta siendo desembolsado a usted ...</p>
        </>
      )}
      {state <= 5 && (
        <button onClick={() => handleSubmit(8, "Rechazada por el cliente")}>
          Rechazar Mi Solicitud
        </button>
      )}
      {state === 2 && <DocumentsList idApplication={id} loanType={type} />}
    </>
  );
};
export default CreditApplicationView;
