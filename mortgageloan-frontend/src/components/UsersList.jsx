import { useEffect, useState } from "react";
import userService from "../services/userService";
import { useNavigate } from "react-router-dom";

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
    <div>
      <h1>Lista Usuarios</h1>
      <div className="table-responsive">
        <table className="table">
          <thead className="table-dark">
            <tr>
              <th scope="col">Rut</th>
              <th scope="col">Nombre</th>
              <th scope="col">Apellido</th>
              <th scope="col">Solicitudes</th>
              <th scope="col">Mi Usuario</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={index}>
                <td>{user.rut}</td>
                <td>{user.name}</td>
                <td>{user.lastname}</td>
                <td>
                  <button
                    className="btn btn-primary"
                    onClick={() => handleViewMyCreditApplications(user.rut)}
                  >
                    Ver Mis Solicitudes
                  </button>
                </td>
                <td>
                  <button
                    className="btn btn-primary"
                    onClick={() => navigate(`/user/add/${user.id_user}`)}
                  >
                    Editar mi Usuario
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UsersList;
