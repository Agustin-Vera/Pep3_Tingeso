import httpClient from "../http-common";

const create = (data) => {
  return httpClient.post("/api/documents/", data, {
    headers: {
      "Content-Type": "multipart/form-data", // axios lo configura automáticamente
    },
  });
};

const getByIdAppDocType = (idApplication, documentType) => {
  return httpClient.get(`/api/documents/${idApplication}/${documentType}`);
};

export default { create, getByIdAppDocType };
