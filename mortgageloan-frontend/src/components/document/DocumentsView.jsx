import { useEffect, useState } from "react";
import documentService from "../../services/documentService";
import DownloadIcon from "@mui/icons-material/Download";
import { Button } from "@mui/material";
import ErrorIcon from "@mui/icons-material/Error";

const DocumentsView = ({ idApplication, documentType }) => {
  const [documentUrl, setDocumentUrl] = useState("");
  const [filename, setFilename] = useState("document.pdf");

  const initDocuments = () => {
    documentService
      .getByIdAppDocType(idApplication, documentType)
      .then((response) => {
        console.log("Documentos", response.data);
        const { name, data } = response.data;
        const url = `data:application/pdf;base64,${data}`;
        setDocumentUrl(url);
        setFilename(name);
      })
      .catch((error) => {
        console.log("Error al obtener documentos", error);
      });
  };
  useEffect(() => {
    initDocuments();
  }, [idApplication, documentType]);

  return (
    <div>
      {documentUrl ? (
        <Button
          color="primary"
          variant="contained"
          endIcon={<DownloadIcon />}
          component="a"
          href={documentUrl}
          download={filename}
        >
          Descargar {filename}
        </Button>
      ) : (
        <Button color="error" variant="contained" endIcon={<ErrorIcon />}>
          Falta Documento
        </Button>
      )}
    </div>
  );
};
export default DocumentsView;
