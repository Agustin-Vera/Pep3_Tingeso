import { Box } from "@mui/material";
import CustomTextField from "../common/inputs/CustomTextField";

const R73PeriodicDeposits = ({ deposits, setDeposits }) => {
  const handleChange = (index, deposit) => {
    const newDeposits = [...deposits];
    newDeposits[index] = deposit;
    setDeposits(newDeposits);
  };

  return (
    <>
      <h3>Respecto a Depósitos Periódicos</h3>
      <p>
        Considere como mes 12 el mes anterior al actual y mes 1 el mes más
        lejano al actual de los 12 meses
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
              label={`Depósito del mes ${index + 1}`}
              value={deposits[index]}
              onChange={(e) => handleChange(index, e.target.value)}
              type="number"
              error={deposits[index] < 0}
            />
          </div>
        ))}
      </Box>
    </>
  );
};

export default R73PeriodicDeposits;
