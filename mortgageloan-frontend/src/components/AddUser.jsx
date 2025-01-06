import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import userService from "../services/userService";
import { Box, Button } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import CustomTextField from "./common/inputs/CustomTextField";

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
      <CustomTextField
        id="rut-field"
        label="Ingresar Rut. Ej: 12345678-9"
        value={rut}
        onChange={(e) => setRut(e.target.value)}
        type="text"
      />
      <CustomTextField
        id="name-field"
        label="Ingresar Nombre. Ej: Gareth"
        value={name}
        onChange={(e) => setName(e.target.value)}
        type="text"
      />
      <CustomTextField
        id="lastname-field"
        label="Ingresar Apellido. Ej: Bale"
        value={lastname}
        onChange={(e) => setLastname(e.target.value)}
        type="text"
      />
      <CustomTextField
        id="email-field"
        label="Ingresar Correo. Ej: GarethBale@gmail.com"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        type="email"
      />
      <CustomTextField
        id="password-field"
        label="Ingresar Contraseña. Ej: MiContraseña"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        type="password"
      />
      <br /> <br />
      <Button
        color="success"
        variant="contained"
        endIcon={<SendIcon />}
        onClick={(e) => saveUser(e)}
      >
        Enviar
      </Button>
    </>
  );
};

export default AddUser;
