import { Box, Button, Typography } from "@mui/material";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import { useState } from "react";

const CustomFileField = ({ id, name, label, accept, onChange }) => {
  const [filename, setFilename] = useState("");

  return (
    <Box sx={{ gap: 1, width: "100%" }}>
      {/* Etiqueta del campo */}
      {label && (
        <Typography variant="subtitle1" component="label" htmlFor={id}>
          {label}
        </Typography>
      )}

      {/* Botón para subir archivo */}
      <Button
        variant="contained"
        component="label"
        startIcon={<UploadFileIcon />}
        sx={{
          bgcolor: "#1976d2",
          color: "white",
          "&:hover": {
            bgcolor: "#1565c0",
          },
        }}
      >
        {filename ? filename : "Seleccionar archivo"}

        {/* Input de archivo oculto */}
        <input
          type="file"
          id={id}
          name={name}
          accept="application/pdf"
          onChange={(e) => {
            onChange(e.target.files[0]);
            setFilename(e.target.files[0].name);
          }}
          hidden
        />
      </Button>
    </Box>
  );
};
export default CustomFileField;
