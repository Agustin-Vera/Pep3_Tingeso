const R3SeniorityStability = (props) => {
  return (
    <div>
      <h2>R3 - Antigüedad Laboral y Estabilidad</h2>
      <p>Revisar la antiguedad del cliente en su empleo ...</p>
      <button onClick={props.nextStep}>Aprobar</button>
      <button
        onClick={() =>
          props.onFailure("Rechazada, la estabilidad laboral es insuficiente")
        }
      >
        Rechazar
      </button>
    </div>
  );
};
export default R3SeniorityStability;
