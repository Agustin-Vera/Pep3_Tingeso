import { useEffect, useState } from "react";
import mortgageLoanCondition from "../services/mortgageLoanCondition";

const CreditConditionsView = ({ id }) => {
  const [type, setType] = useState("");
  const [maxTerm, setMaxTerm] = useState("");
  const [interestRate, setInterestRate] = useState("");
  const [maximumFinancing, setMaximumFinancing] = useState("");

  const handleCreditType = (e) => {
    setType(e);
    mortgageLoanCondition.get(e).then((response) => {
      console.log("Condiciones de Crédito:", response.data);
      setMaxTerm(response.data.maximumTerm);
      setInterestRate(response.data.interestRate);
      setMaximumFinancing(response.data.maximumFinancingAmount);
    });
  };

  useEffect(() => {
    handleCreditType(id);
  }, [id]);

  return (
    <>
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
    </>
  );
};
export default CreditConditionsView;
