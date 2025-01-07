import { TextField } from "@mui/material";

const CustomTextField = ({
  id = "outlined-error",
  label,
  value,
  onChange,
  type = "text",
  error,
}) => {
  return (
    <TextField
      id={id}
      error={error}
      value={value}
      label={label}
      variant="filled"
      type={type}
      helperText={error ? "Ingrese una entrada correcta" : ""}
      onChange={onChange}
      sx={{
        m: 1,
        width: "80%",
        bgcolor: "#fff",
        p: 1.5,
        borderRadius: 2,
      }}
    />
  );
};

export default CustomTextField;
