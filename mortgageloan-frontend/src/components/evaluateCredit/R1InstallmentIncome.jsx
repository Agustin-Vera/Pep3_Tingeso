import { useEffect, useState } from "react";
import creditApplicationService from "../../services/creditApplicationService";
import DocumentsView from "../document/DocumentsView";

/**
 * Componente que representa la regla de negocio R1
 * @param {*} props
 * @returns
 */
const R1InstallmentIncome = (props) => {
  const [answerEvaluation, setAnswerEvaluation] = useState();
  const [income, setIncome] = useState("");

  const evaluate = () => {
    creditApplicationService.evaluateR1(props.id, income).then((response) => {
      console.log("Respuesta: ", response);
      if (response.data.approved === true) {
        setAnswerEvaluation(response.data.message);
      } else {
        setAnswerEvaluation(response.data.message);
      }
    });
  };

  return (
    <div>
      <h2>R1 - Cuota / Ingreso</h2>
      <p>
        Monto a pedir: ${Number(props.amount).toLocaleString("es-CL")} pesos
      </p>
      <p>Plazo para pagar: {props.term} años</p>
      <div>
        <label>Ingrese los ingresos mensuales del usuario:</label>
        <input
          type="text"
          value={income}
          onChange={(e) => setIncome(e.target.value)}
        />
      </div>
      <button onClick={evaluate}>Evaluar</button>
      <button onClick={props.nextStep}>Aprobar</button>
      <button
        onClick={() =>
          props.onFailure("Rechazada, la capacidad de pago es insuficiente")
        }
      >
        Rechazar
      </button>
      <p>Resultado: {answerEvaluation}</p>
    </div>
  );
};
export default R1InstallmentIncome;
