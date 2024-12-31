import CustomFileField from "../common/inputs/CustomFileField";

const SecondHome = ({ setCreditHistoryDoc, setFirstHomeDeedDoc }) => {
  return (
    <div>
      <h2>Segunda Vivienda</h2>
      <CustomFileField
        id="archivo"
        name="creditHistoryDoc"
        label="Ingresar Historial Crediticio:"
        onChange={setCreditHistoryDoc}
      />
      <br />
      <CustomFileField
        id="archivo"
        name="firstHomeDeedDoc"
        label="Ingresar Escritura Primera Vivienda:"
        onChange={setFirstHomeDeedDoc}
      />
    </div>
  );
};
export default SecondHome;
