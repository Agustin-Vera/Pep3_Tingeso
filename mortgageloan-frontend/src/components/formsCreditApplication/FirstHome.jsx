const FirstHome = ({ setCreditHistoryDoc }) => {
  return (
    <div>
      <h2>Primera Vivienda</h2>
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
    </div>
  );
};
export default FirstHome;
