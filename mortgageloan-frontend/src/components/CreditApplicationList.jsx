import { useEffect, useState } from "react";
import creditApplicationService from "../services/creditApplicationService";
import { useNavigate, useParams } from "react-router-dom";

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
    <div>
      <h1>Lista de Solicitudes</h1>
      <div className="table-responsive">
        <table className="table">
          <thead className="table-dark">
            <tr>
              <th scope="col">ID</th>
              <th scope="col">Rut</th>
              <th scope="col">Tipo</th>
              <th scope="col">Monto</th>
              <th scope="col">Plazo</th>
              <th scope="col">Estado</th>
              <th scope="col">Descripción</th>
              <th scope="col">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {creditApplcations.map((creditApplication, index) => (
              <tr key={index}>
                <td>{creditApplication.id_application}</td>
                <td>{creditApplication.rutUser}</td>
                <td>{creditApplication.type}</td>
                <td>{creditApplication.amount}</td>
                <td>{creditApplication.term}</td>
                <td>{creditApplication.state}</td>
                <td>{creditApplication.stateDescription}</td>
                <td>
                  {userRut ? (
                    <button
                      className="btn btn-primary"
                      onClick={() =>
                        navigate(
                          `/creditApplication/list/${userRut}/${creditApplication.id_application}`
                        )
                      }
                    >
                      Ver Mi Solicitud
                    </button>
                  ) : (
                    <button
                      className="btn btn-success"
                      onClick={() =>
                        navigate(
                          `/creditApplication/managment/${creditApplication.id_application}`
                        )
                      }
                    >
                      Administrar Solicitud
                    </button>
                  )}
                </td>
                <td></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
export default CreditApplicationList;
