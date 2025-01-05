import ErrorIcon from "@mui/icons-material/Error";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import { Button } from "@mui/material";

const R3SeniorityStability = (props) => {
  return (
    <div>
      <h2>R3 - Antigüedad Laboral y Estabilidad</h2>
      <p>Revisar la antiguedad del cliente en su empleo ...</p>
      <Button
        color="success"
        variant="contained"
        endIcon={<CheckCircleOutlineIcon />}
        onClick={props.nextStep}
      >
        Aprobar
      </Button>
      <Button
        color="error"
        variant="contained"
        endIcon={<ErrorIcon />}
        onClick={() =>
          props.onFailure("Rechazada, la estabilidad laboral es insuficiente")
        }
      >
        Rechazar
      </Button>
    </div>
  );
};
export default R3SeniorityStability;
