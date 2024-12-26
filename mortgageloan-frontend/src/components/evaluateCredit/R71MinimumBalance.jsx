const R71MinimumBalance = ({ id, balance, setBalance, setR71Ans }) => {
  return (
    <>
      <h3>Respecto a Saldo Minimo Requerido</h3>
      <div>
        <label>Ingrese el saldo del usuario en su cuenta de ahorros:</label>
        <input
          type="text"
          value={balance}
          onChange={(e) => setBalance(e.target.value)}
        />
      </div>
    </>
  );
};

export default R71MinimumBalance;
