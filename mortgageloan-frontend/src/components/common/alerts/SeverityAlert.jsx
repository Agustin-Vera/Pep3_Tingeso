import { Alert, Backdrop, Button } from "@mui/material";

const SeverityAlert = ({ open, onClose, severity, message }) => {
  return (
    <Backdrop open={open} onClick={onClose}>
      <Alert
        severity={severity}
        action={
          onClose && (
            <Button color="inherit" size="small" onClick={onClose}>
              Aceptar
            </Button>
          )
        }
        onClick={onClose}
      >
        {message}
      </Alert>
    </Backdrop>
  );
};
export default SeverityAlert;
