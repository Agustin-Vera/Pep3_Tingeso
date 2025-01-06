import CustomDateSelect from "../common/inputs/CustomDateSelect";

const R74BalanceSeniority = ({ setDate }) => {
  return (
    <>
      <h3>Respecto a Relación Saldo/Años de Antigüedad</h3>
      <p>Ingrese la fecha de creación de la cuenta de ahorro del cliente</p>
      <CustomDateSelect handleDateChange={setDate} />
    </>
  );
};

export default R74BalanceSeniority;
