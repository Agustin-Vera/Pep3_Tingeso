import httpClient from "../http-common";

const create = (data) => {
  return httpClient.post("/api/users/", data);
};

const getAll = () => {
  return httpClient.get("/api/users/");
};

const get = (id) => {
  return httpClient.get(`/api/users/${id}`);
};

const update = (data) => {
  return httpClient.put("/api/users/", data);
};

export default { create, getAll, get, update };
