import CustomTextField from "../common/inputs/CustomTextField";

const R71MinimumBalance = ({ id, balance, setBalance, setR71Ans }) => {
  return (
    <>
      <h3>Respecto a Saldo Minimo Requerido</h3>
      <div>
        <CustomTextField
          label="Saldo de cuenta de ahorros. Ej: 2.000.000"
          value={balance}
          onChange={(e) => setBalance(e.target.value)}
          type="number"
          error={balance < 0}
        />
      </div>
    </>
  );
};

export default R71MinimumBalance;
