import httpClient from "../http-common";

const getAll = () => {
  return httpClient.get("/api/states/");
};

const get = (id) => {
  return httpClient.get(`/api/states/${id}`);
};

export default { getAll, get };
