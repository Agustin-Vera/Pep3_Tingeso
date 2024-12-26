import { useState } from "react";
import creditApplicationService from "../../services/creditApplicationService";

const R6ApplicantAge = ({ nextStep, onFailure, id }) => {
  const [answerEvaluation, setAnswerEvaluation] = useState("");
  const [birthday, setBirthday] = useState("");
  const [birthMonth, setBirthMonth] = useState("");
  const [birthYear, setBirhtYear] = useState("");
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
        } else {
          setAnswerEvaluation(response.data.message);
        }
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
      <button onClick={evaluate}>Evaluar</button>
      <button onClick={nextStep}>Aprobar</button>
      <button
        onClick={() =>
          onFailure("Rechazada, la edad del usuario es muy elevada")
        }
      >
        Rechazar
      </button>
      <p>Resultado: {answerEvaluation}</p>
    </div>
  );
};
export default R6ApplicantAge;
