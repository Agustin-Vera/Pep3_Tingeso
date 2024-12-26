import { useEffect, useState } from "react";

const R74BalanceSeniority = ({ setDate }) => {
  const [day, setDay] = useState("");
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");

  useEffect(() => {
    if (day && month && year) {
      const creationDate = new Date(year, month - 1, day);
      const formattedCreationDate = creationDate.toISOString().split("T")[0];
      console.log("Fecha formateada:", formattedCreationDate);
      setDate(formattedCreationDate);
    }
  }, [day, month, year]);

  return (
    <>
      <h3>Respecto a Relación Saldo/Años de Antigüedad</h3>
      <p>Ingrese la fecha de creación de la cuenta de ahorro del cliente</p>
      <div>
        <label>Ingrese el día:</label>
        <input
          type="text"
          value={day}
          onChange={(e) => setDay(e.target.value)}
        />
      </div>
      <div>
        <label>Ingrese el mes:</label>
        <input
          type="text"
          value={month}
          onChange={(e) => setMonth(e.target.value)}
        />
      </div>
      <div>
        <label>Ingrese el año:</label>
        <input
          type="text"
          value={year}
          onChange={(e) => setYear(e.target.value)}
        />
      </div>
    </>
  );
};

export default R74BalanceSeniority;
