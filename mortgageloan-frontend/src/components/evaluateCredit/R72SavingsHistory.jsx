const R72SavingsHistory = ({ savings, setSavings }) => {
  const handleChange = (index, saving) => {
    const newSavings = [...savings];
    newSavings[index] = saving;
    setSavings(newSavings);
  };

  return (
    <>
      <h3>Respecto a Historial de Ahorro Consistente y Retiros Recientes</h3>
      <p>
        Considere como mes 12 el mes anterior al actual y mes 1 el mes más
        lejano al actual de los 12 meses
      </p>
      {[...Array(12)].map((_, index) => (
        <div key={index}>
          <label>Ingrese el saldo del mes {index + 1}:</label>
          <input
            type="text"
            value={savings[index]}
            onChange={(e) => handleChange(index, e.target.value)}
          />
        </div>
      ))}
    </>
  );
};

export default R72SavingsHistory;
