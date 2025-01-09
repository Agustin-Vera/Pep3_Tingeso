import ErrorIcon from "@mui/icons-material/Error";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import { Button } from "@mui/material";

const R2ClientCreditHistory = (props) => {
  return (
    <div>
      <h2>R2 - Historial Crediticio Cliente</h2>
      <p>
        Se revisa el historial crediticio del cliente en DICOM (Directorio de
        Información Comercial) (Puede optar por revisar los documentos del
        cliente) ...
      </p>
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
          props.onFailure(
            "Rechazada, el historial crediticio del cliente no es aprobado"
          )
        }
      >
        Rechazar
      </Button>
    </div>
  );
};
export default R2ClientCreditHistory;
