import { Box } from "@mui/material";
import CustomTextField from "../common/inputs/CustomTextField";

const R72SavingsHistory = ({ savings, setSavings }) => {
  const handleChange = (index, saving) => {
    const newSavings = [...savings];
    newSavings[index] = saving;
    setSavings(newSavings);
  };

  return (
    <>
      <h3>Respecto a Historial de Ahorro Consistente y Retiros Recientes</h3>
      <p>
        Ingrese los saldos del cliente en su cuenta de ahorros en los últimos
        doce meses. (Considere como mes 12 el mes actual y mes 1 el mes más
        lejano al actual de los 12 meses).
      </p>
      <Box
        sx={{
          display: "grid",
          flexDirection: "column",
          gridTemplateColumns: "1fr 1fr",
        }}
      >
        {[...Array(12)].map((_, index) => (
          <div key={index}>
            <CustomTextField
              label={`Saldo el mes ${index + 1}`}
              value={savings[index]}
              onChange={(e) => handleChange(index, e.target.value)}
              type="number"
              error={savings[index] < 0}
            />
          </div>
        ))}
      </Box>
    </>
  );
};

export default R72SavingsHistory;
