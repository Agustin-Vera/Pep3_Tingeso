import CustomFileField from "../common/inputs/CustomFileField";

const FirstHome = ({ setCreditHistoryDoc }) => {
  return (
    <div>
      <h2>Primera Vivienda</h2>
      <CustomFileField
        id="archivo"
        name="creditHistoryDoc"
        label="Ingresar Historial Crediticio:"
        onChange={setCreditHistoryDoc}
      />
    </div>
  );
};
export default FirstHome;
