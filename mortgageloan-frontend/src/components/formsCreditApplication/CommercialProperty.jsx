const CommercialProperty = ({
  setFinancialStatusBusinessDoc,
  setBusinessPlanDoc,
}) => {
  return (
    <div>
      <h2>Propiedad Comercial</h2>
      <div>
        <label htmlFor="archivo">Ingresar Estado Financiero del Negocio:</label>
        <input
          type="file"
          id="archivo"
          name="financialStatusBusinessDoc"
          accept="application/pdf"
          onChange={(e) => {
            setFinancialStatusBusinessDoc(e.target.files[0]);
          }}
        />
      </div>
      <div>
        <label htmlFor="archivo">Ingresar Plan de Negocios:</label>
        <input
          type="file"
          id="archivo"
          name="businessPlanDoc"
          accept="application/pdf"
          onChange={(e) => {
            setBusinessPlanDoc(e.target.files[0]);
          }}
        />
      </div>
    </div>
  );
};
export default CommercialProperty;
