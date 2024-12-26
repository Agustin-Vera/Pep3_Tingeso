const R73PeriodicDeposits = ({ deposits, setDeposits }) => {
  const handleChange = (index, deposit) => {
    const newDeposits = [...deposits];
    newDeposits[index] = deposit;
    setDeposits(newDeposits);
  };

  return (
    <>
      <h3>Respecto a Depósitos Periódicos</h3>
      <p>
        Considere como mes 12 el mes anterior al actual y mes 1 el mes más
        lejano al actual de los 12 meses
      </p>
      {[...Array(12)].map((_, index) => (
        <div key={index}>
          <label>Ingrese el depósito del mes {index + 1}:</label>
          <input
            type="text"
            value={deposits[index]}
            onChange={(e) => handleChange(index, e.target.value)}
          />
        </div>
      ))}
    </>
  );
};

export default R73PeriodicDeposits;
