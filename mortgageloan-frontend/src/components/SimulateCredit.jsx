import { useState } from "react";
import creditApplicationService from "../services/creditApplicationService";
import mortgageLoanCondition from "../services/mortgageLoanCondition";

const SimulateCredit = () => {
  const [type, setType] = useState("");
  const [amount, setAmount] = useState("");
  const [term, setTerm] = useState("");
  const [monthlyInstallment, setMonthlyInstallment] = useState("");
  const [maxTerm, setMaxTerm] = useState("");
  const [interestRate, setInterestRate] = useState("");
  const [maximumFinancing, setMaximumFinancing] = useState("");

  const simulateCreditApplication = (e) => {
    e.preventDefault();
    creditApplicationService
      .simulate(amount, term, type)
      .then((response) => {
        console.log("Simulación de Crédito:", response.data);
        setMonthlyInstallment(response.data);
      })
      .catch((error) => {
        console.log("Error al simular la solicitud de crédito", error);
        alert("Error al simular la solicitud de crédito");
      });
  };

  const handleCreditType = (e) => {
    setType(e);
    mortgageLoanCondition.get(e).then((response) => {
      console.log("Condiciones de Crédito:", response.data);
      setMaxTerm(response.data.maximumTerm);
      setInterestRate(response.data.interestRate);
      setMaximumFinancing(response.data.maximumFinancingAmount);
    });
  };

  return (
    <>
      <h1>Simulación de Crédito</h1>
      <div>
        <label>Ingrese el monto a solicitar:</label>
        <input
          type="text"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
      </div>
      <div>
        <label>Ingrese el plazo a pagar (en años):</label>
        <input
          type="text"
          value={term}
          onChange={(e) => setTerm(e.target.value)}
        />
      </div>
      <br />
      <div>
        <label>Tipo de Crédito:</label>
        <select
          id="dropdown"
          onChange={(e) => {
            handleCreditType(e.target.value);
          }}
        >
          <option value="">Selecciona el Tipo de Crédito</option>
          <option value={1}>Primera Vivienda</option>
          <option value={2}>Segunda Vivienda</option>
          <option value={3}>Propiedades Comerciales</option>
          <option value={4}>Remodelación</option>
        </select>
      </div>
      <br />
      {type && (
        <>
          <p>Tasa de Interés (anual): {interestRate}%</p>
          <p>
            Monto Máximo Financiamiento: {maximumFinancing * 100}% del valor de
            la propiedad
          </p>
          <p>Plazo Máximo: {maxTerm} años</p>
        </>
      )}

      <div className="col-12">
        <button
          type="submit"
          className="btn btn-primary"
          onClick={(e) => simulateCreditApplication(e)}
        >
          Simular
        </button>
      </div>
      <br />
      {monthlyInstallment && (
        <>
          <h2>Resultados</h2>
          <p>
            Cuota mensual: ${Number(monthlyInstallment).toLocaleString("es-CL")}{" "}
            pesos
          </p>
          <p>
            Monto Solicitado: ${Number(amount).toLocaleString("es-CL")} pesos
          </p>
          <p>Plazo para Pagar: {term} años</p>
        </>
      )}
    </>
  );
};
export default SimulateCredit;
