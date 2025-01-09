import { useEffect, useState } from "react";
import creditApplicationService from "../services/creditApplicationService";
import { useNavigate, useParams } from "react-router-dom";
import {
  Box,
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import HandymanIcon from "@mui/icons-material/Handyman";
import PreviewIcon from "@mui/icons-material/Preview";

const CreditApplicationList = () => {
  const [creditApplcations, setCreditApplcation] = useState([]);
  const { userRut } = useParams();
  const navigate = useNavigate();

  const init = () => {
    creditApplicationService
      .getAll()
      .then((response) => {
        if (userRut) {
          const creditApplcationsFilter = response.data.filter(
            (creditApplication) => creditApplication.rutUser === userRut
          );
          setCreditApplcation(creditApplcationsFilter);
        } else {
          setCreditApplcation(response.data);
        }
      })
      .catch((error) => {
        console.log("Se produjo un error al mostrar las solicitudes", error);
      });
  };
  useEffect(() => {
    init();
  }, [userRut]);

  return (
    <Box>
      <h1>Lista de Solicitudes</h1>
      <TableContainer component={Paper} sx={{ boxShadow: 24 }}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead sx={{ bgcolor: "#bdbdbd" }}>
            <TableRow>
              <TableCell align="left" sx={{ fontWeight: "bold" }}>
                ID
              </TableCell>
              <TableCell align="left" sx={{ fontWeight: "bold" }}>
                Rut
              </TableCell>
              <TableCell align="left" sx={{ fontWeight: "bold" }}>
                Tipo
              </TableCell>
              <TableCell align="left" sx={{ fontWeight: "bold" }}>
                Monto
              </TableCell>
              <TableCell align="left" sx={{ fontWeight: "bold" }}>
                Plazo
              </TableCell>
              <TableCell align="left" sx={{ fontWeight: "bold" }}>
                Estado
              </TableCell>
              <TableCell align="left" sx={{ fontWeight: "bold" }}>
                Acciones
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {creditApplcations.map((creditApplication) => (
              <TableRow
                key={creditApplication.id_application}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell align="left">
                  {creditApplication.id_application}
                </TableCell>
                <TableCell align="left">{creditApplication.rutUser}</TableCell>
                <TableCell align="left">{creditApplication.type}</TableCell>
                <TableCell align="left">{creditApplication.amount}</TableCell>
                <TableCell align="left">{creditApplication.term}</TableCell>
                <TableCell align="left">{creditApplication.state}</TableCell>
                <TableCell>
                  {userRut ? (
                    <Button
                      color="success"
                      variant="contained"
                      endIcon={<PreviewIcon />}
                      onClick={() =>
                        navigate(
                          `/creditApplication/list/${userRut}/${creditApplication.id_application}`
                        )
                      }
                    >
                      Ver Mi Solicitud
                    </Button>
                  ) : (
                    <Button
                      color="success"
                      variant="contained"
                      endIcon={<HandymanIcon />}
                      onClick={() =>
                        navigate(
                          `/creditApplication/managment/${creditApplication.id_application}`
                        )
                      }
                    >
                      Administrar
                    </Button>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};
export default CreditApplicationList;
