import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import userService from "../services/userService";

const AddUser = () => {
  const [rut, setRut] = useState("");
  const [name, setName] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [titleUserForm, setTitleUserForm] = useState("");
  const { id } = useParams();
  const navigate = useNavigate();

  const saveUser = (e) => {
    e.preventDefault();
    const user = {
      rut,
      name,
      lastname,
      email,
      password,
      id_user: id,
    };

    if (id) {
      userService
        .update(user)
        .then((response) => {
          console.log("Usuario actualizado", response.data);
          navigate("/user/list");
        })
        .catch((error) => {
          console.log("Error al intentar actualizar datos de usuario", error);
        });
    } else {
      userService
        .create(user)
        .then((response) => {
          console.log("Usuario creado", response.data);
          navigate("/user/list");
        })
        .catch((error) => {
          console.log("Error al intentar crear un usuario", error);
          alert(error.response.data);
        });
    }
  };

  useEffect(() => {
    if (id) {
      setTitleUserForm("Editar Usuario Existente");
      userService
        .get(id)
        .then((user) => {
          setRut(user.data.rut);
          setName(user.data.name);
          setLastname(user.data.lastname);
          setEmail(user.data.email);
          setPassword(user.data.password);
        })
        .catch((error) => {
          console.log("Se ha producido un error al obtener al usuario", error);
        });
    } else {
      setTitleUserForm("Registrar Nuevo Usuario");
    }
  }, [id]);

  return (
    <>
      <h1>{titleUserForm}</h1>
      <form className="row g-3">
        <div className="col-12">
          <label htmlFor="inputRut" className="form-label">
            Ingresar Rut
          </label>
          <input
            type="text"
            className="form-control"
            id="inputRut"
            placeholder="Ej: 12345678-9"
            value={rut}
            onChange={(e) => setRut(e.target.value)}
          />
        </div>
        <div className="col-md-6">
          <label htmlFor="inputName" className="form-label">
            Ingresar Nombre
          </label>
          <input
            type="text"
            className="form-control"
            id="inputName"
            placeholder="Ej: Gareth"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="col-md-6">
          <label htmlFor="inputLastname" className="form-label">
            Ingresar Apellido
          </label>
          <input
            type="text"
            className="form-control"
            id="inputLastname"
            placeholder="Ej: Bale"
            value={lastname}
            onChange={(e) => setLastname(e.target.value)}
          />
        </div>
        <div className="col-md-6">
          <label htmlFor="inputEmail4" className="form-label">
            Ingresar Correo
          </label>
          <input
            type="email"
            className="form-control"
            id="inputEmail4"
            placeholder="Ej: GarethBale@gmail.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="col-md-6">
          <label htmlFor="inputPassword4" className="form-label">
            Ingresar Contraseña
          </label>
          <input
            type="password"
            className="form-control"
            id="inputPassword4"
            placeholder="Ej: MiContraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="col-12">
          <button
            type="submit"
            className="btn btn-primary"
            onClick={(e) => saveUser(e)}
          >
            Enviar
          </button>
        </div>
      </form>
    </>
  );
};

export default AddUser;
