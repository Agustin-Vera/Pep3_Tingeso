const R2ClientCreditHistory = (props) => {
  return (
    <div>
      <h2>R2 - Historial Crediticio Cliente</h2>
      <p>
        Se revisa el historial crediticio del cliente en DICOM (Directorio de
        Información Comercial) ...
      </p>
      <button onClick={props.nextStep}>Aprobar</button>
      <button
        onClick={() =>
          props.onFailure(
            "Rechazada, el historial crediticio del cliente no es aprobado"
          )
        }
      >
        Rechazar
      </button>
    </div>
  );
};
export default R2ClientCreditHistory;
