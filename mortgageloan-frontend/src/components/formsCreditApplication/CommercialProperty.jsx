import CustomFileField from "../common/inputs/CustomFileField";

const CommercialProperty = ({
  setFinancialStatusBusinessDoc,
  setBusinessPlanDoc,
}) => {
  return (
    <div>
      <h2>Propiedad Comercial</h2>
      <CustomFileField
        id="archivo"
        name="financialStatusBusinessDoc"
        label="Ingresar Estado Financiero del Negocio:"
        onChange={setFinancialStatusBusinessDoc}
      />
      <br />
      <CustomFileField
        id="archivo"
        name="businessPlanDoc"
        label="Ingresar Plan de Negocios:"
        onChange={setBusinessPlanDoc}
      />
    </div>
  );
};
export default CommercialProperty;
