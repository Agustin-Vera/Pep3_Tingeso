const SecondHome = ({ setCreditHistoryDoc, setFirstHomeDeedDoc }) => {
  return (
    <div>
      <h2>Segunda Vivienda</h2>
      <div>
        <label htmlFor="archivo">Ingresar Historial Crediticio:</label>
        <input
          type="file"
          id="archivo"
          name="creditHistoryDoc"
          accept="application/pdf"
          onChange={(e) => {
            setCreditHistoryDoc(e.target.files[0]);
          }}
        />
      </div>
      <div>
        <label htmlFor="archivo">Ingresar Escritura Primera Vivienda:</label>
        <input
          type="file"
          id="archivo"
          name="firstHomeDeedDoc"
          accept="application/pdf"
          onChange={(e) => {
            setFirstHomeDeedDoc(e.target.files[0]);
          }}
        />
      </div>
    </div>
  );
};
export default SecondHome;
