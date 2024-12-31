import CustomFileField from "../common/inputs/CustomFileField";

const Remodeling = ({ setRenovationBudgetDoc }) => {
  return (
    <div>
      <h2>Remodelación</h2>
      <CustomFileField
        id="archivo"
        name="renovationBudgetDoc"
        label="Ingresar Estado Financiero del Negocio:"
        onChange={setRenovationBudgetDoc}
      />
    </div>
  );
};
export default Remodeling;
