import { useNavigate } from "react-router-dom";

export default function MyNavbar() {
  const navigate = useNavigate();

  return (
    <nav className="navbar fixed-top navbar-dark-custom">
      <div className="container">
        <a
          className="navbar-brand text-white"
          href="#home"
          onClick={() => navigate("/home")}
        >
          PrestaBanco
        </a>
        <button
          type="button"
          className="btn btn-secondary ms-5"
          onClick={() => navigate("/creditApplication/simulate")}
        >
          Simular Crédito
        </button>
        <button
          type="button"
          className="btn btn-secondary ms-3"
          onClick={() => navigate("/creditApplication/add")}
        >
          Solicitar Crédito Chile
        </button>
        <button
          type="button"
          className="btn btn-secondary ms-3"
          onClick={() => navigate("/creditApplication/list")}
        >
          Ver Solicitudes
        </button>
        <button
          type="button"
          className="btn btn-secondary ms-5"
          onClick={() => navigate("/user/list")}
        >
          Ver Usuarios
        </button>
        <ul className="navbar-nav ms-auto">
          <li className="nav-item">
            <button
              className="btn btn-success"
              onClick={() => navigate("/user/add")}
            >
              Registrarse
            </button>
          </li>
        </ul>
      </div>
    </nav>
  );
}
