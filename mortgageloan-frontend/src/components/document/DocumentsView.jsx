import { useEffect, useState } from "react";
import documentService from "../../services/documentService";

const DocumentsView = ({ idApplication, documentType }) => {
  const [documentUrl, setDocumentUrl] = useState("");

  const initDocuments = () => {
    documentService
      .getByIdAppDocType(idApplication, documentType)
      .then((response) => {
        console.log("Documentos", response.data);
        const blob = new Blob([response.data], { type: "application/pdf" });
        const url = URL.createObjectURL(blob);
        setDocumentUrl(url);
      });
  };
  useEffect(() => {
    initDocuments();
  }, [idApplication, documentType]);

  return (
    <div>
      <div>
        <iframe
          src={documentUrl}
          title="documento de solicitud"
          width="600"
          height="600"
        ></iframe>
      </div>
    </div>
  );
};
export default DocumentsView;
