import { useEffect, useState } from "react";
import userService from "../services/userService";
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import {
  Box,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Table,
  TableBody,
} from "@mui/material";
import ListAltIcon from "@mui/icons-material/ListAlt";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";

const UsersList = () => {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  const init = () => {
    userService
      .getAll()
      .then((response) => {
        console.log("Mostrando usuarios");
        setUsers(response.data);
      })
      .catch((error) => {
        console.log("Se produjo un error al mostrar usuarios", error);
      });
  };

  const handleViewMyCreditApplications = (userRut) => {
    navigate(`/creditApplication/list/${userRut}`);
  };

  useEffect(() => {
    init();
  }, []);

  return (
    <Box>
      <h1>Lista de Usuarios</h1>
      <TableContainer component={Paper} sx={{ boxShadow: 24 }}>
        <Table aria-label="simple table">
          <TableHead sx={{ bgcolor: "#bdbdbd" }}>
            <TableRow>
              <TableCell align="left" sx={{ fontWeight: "bold" }}>
                ID
              </TableCell>
              <TableCell align="left" sx={{ fontWeight: "bold" }}>
                Rut
              </TableCell>
              <TableCell align="left" sx={{ fontWeight: "bold" }}>
                Nombre
              </TableCell>
              <TableCell align="left" sx={{ fontWeight: "bold" }}>
                Apellido
              </TableCell>
              <TableCell align="left" sx={{ fontWeight: "bold" }}>
                Solicitudes
              </TableCell>
              <TableCell align="left" sx={{ fontWeight: "bold" }}>
                Mi Usuario
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user) => (
              <TableRow
                key={user.id_user}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell align="left">{user.id_user}</TableCell>
                <TableCell align="left">{user.rut}</TableCell>
                <TableCell align="left">{user.name}</TableCell>
                <TableCell align="left">{user.lastname}</TableCell>
                <TableCell>
                  <Button
                    color="primary"
                    variant="contained"
                    endIcon={<ListAltIcon />}
                    onClick={() => handleViewMyCreditApplications(user.rut)}
                  >
                    Ver Mis Solicitudes
                  </Button>
                </TableCell>
                <TableCell>
                  <Button
                    color="primary"
                    variant="contained"
                    endIcon={<ManageAccountsIcon />}
                    onClick={() => navigate(`/user/add/${user.id_user}`)}
                  >
                    Editar Mi Usuario
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default UsersList;
