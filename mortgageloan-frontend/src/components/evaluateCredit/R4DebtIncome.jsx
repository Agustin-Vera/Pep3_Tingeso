import { useState } from "react";
import creditApplicationService from "../../services/creditApplicationService";

const R4DebtIncome = (props) => {
  const [answerEvaluation, setAnswerEvaluation] = useState();
  const [income, setIncome] = useState("");
  const [debt, setDebt] = useState("");

  const evaluate = () => {
    creditApplicationService
      .evaluateR4(props.id, income, debt)
      .then((response) => {
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
      <h2>R4 - Relación Deuda / Ingreso</h2>
      <div>
        <label>Ingrese las deudas totales del usuario:</label>
        <input
          type="text"
          value={debt}
          onChange={(e) => setDebt(e.target.value)}
        />
      </div>
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
          props.onFailure("Rechazada, la cantidad de deudas no es soportada")
        }
      >
        Rechazar
      </button>
      <p>Resultado: {answerEvaluation}</p>
    </div>
  );
};
export default R4DebtIncome;
