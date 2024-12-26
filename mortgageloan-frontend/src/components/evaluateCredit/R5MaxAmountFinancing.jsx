import { useState } from "react";
import creditApplicationService from "../../services/creditApplicationService";

const R5MaxAmountFinancing = (props) => {
  const [answerEvaluation, setAnswerEvaluation] = useState("");
  const [propertyValue, setPropertyValue] = useState("");
  const evaluate = () => {
    creditApplicationService
      .evaluateR5(props.id, propertyValue)
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
      <h2>R5 - Monto Máximo de Financiamiento</h2>
      <p>Monto Solicitado: ${Number(props.amount).toLocaleString("es-CL")}</p>
      <div>
        <label>Ingrese el valor de la propiedad:</label>
        <input
          type="text"
          value={propertyValue}
          onChange={(e) => setPropertyValue(e.target.value)}
        />
      </div>
      <button onClick={evaluate}>Evaluar</button>
      <button onClick={props.nextStep}>Aprobar</button>
      <button
        onClick={() =>
          props.onFailure(
            "Rechazada, el monto solicitado es mayor al permitido"
          )
        }
      >
        Rechazar
      </button>
      <p>Resultado: {answerEvaluation}</p>
    </div>
  );
};
export default R5MaxAmountFinancing;
