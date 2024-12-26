const Remodeling = ({ setRenovationBudgetDoc }) => {
  return (
    <div>
      <h2>Remodelación</h2>
      <div>
        <label htmlFor="archivo">Ingresar Estado Financiero del Negocio:</label>
        <input
          type="file"
          id="archivo"
          name="renovationBudgetDoc"
          accept="application/pdf"
          onChange={(e) => {
            setRenovationBudgetDoc(e.target.files[0]);
          }}
        />
      </div>
    </div>
  );
};
export default Remodeling;
