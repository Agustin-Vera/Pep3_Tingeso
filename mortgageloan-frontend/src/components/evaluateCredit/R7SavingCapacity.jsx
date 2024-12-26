import { useState } from "react";
import creditApplicationService from "../../services/creditApplicationService";
import R71MinimumBalance from "./R71MinimumBalance";
import R72SavingsHistory from "./R72SavingsHistory";
import R73PeriodicDeposits from "./R73PeriodicDeposits";
import R74BalanceSeniority from "./R74BalanceSeniority";

const R7SavingCapacity = ({ nextStep, onFailure, id }) => {
  const [answerEvaluation, setAnswerEvaluation] = useState("");
  const [balance, setBalance] = useState(""); // saldo
  const [income, setIncome] = useState(""); // ingreso
  const [savings, setSavings] = useState(Array(12).fill("")); // ahorros
  const [deposits, setDeposits] = useState(Array(12).fill("")); // depositos
  const [date, setDate] = useState(""); // fecha creacion cuenta ahorros
  console.log("Date en padre: ", date);

  const evaluate = () => {
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
        } else {
          setAnswerEvaluation(response.data.message);
        }
      })
      .catch((error) => {
        console.log("Error al evaluar la Capacidad de Ahorro", error);
      });
  };

  return (
    <div>
      <h1>R7 - Capacidad de Ahorro</h1>
      <div>
        <label>Ingrese el ingreso mensual del cliente:</label>
        <input
          type="text"
          value={income}
          onChange={(e) => setIncome(e.target.value)}
        />
      </div>{" "}
      <br />
      <R71MinimumBalance id={id} balance={balance} setBalance={setBalance} />
      <br />
      <R72SavingsHistory savings={savings} setSavings={setSavings} />
      <br />
      <R73PeriodicDeposits deposits={deposits} setDeposits={setDeposits} />
      <br />
      <R74BalanceSeniority setDate={setDate} />
      <br />
      <button onClick={evaluate}>Evaluar</button>
      <button onClick={nextStep}>Aprobar</button>
      <button
        onClick={() =>
          onFailure("Rechazada, la capacidad de ahorro es insuficiente")
        }
      >
        Rechazar
      </button>
      <p>Resultado: {answerEvaluation}</p>
      <br />
    </div>
  );
};

export default R7SavingCapacity;
