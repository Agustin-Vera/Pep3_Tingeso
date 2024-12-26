import httpClient from "../http-common";

const create = (data) => {
  return httpClient.post("/api/creditApplication/", data);
};

const getAll = () => {
  return httpClient.get("/api/creditApplication/");
};

const get = (id) => {
  return httpClient.get(`/api/creditApplication/${id}`);
};

const update = (data) => {
  return httpClient.put("/api/creditApplication/", data);
};

const simulate = (amount, term, type) => {
  return httpClient.get("/api/creditApplication/simulate", {
    params: {
      amount,
      term,
      type,
    },
  });
};

const evaluateR1 = (id, income) => {
  return httpClient.get(
    `/api/creditApplication/evaluate/R1/${id}?income=${income}`
  );
};

const evaluateR4 = (id, income, debts) => {
  return httpClient.get(
    `/api/creditApplication/evaluate/R4/${id}?income=${income}&debts=${debts}`
  );
};

const evaluateR5 = (id, propertyValue) => {
  return httpClient.get(
    `/api/creditApplication/evaluate/R5/${id}?propertyValue=${propertyValue}`
  );
};

const evaluateR6 = (id, birthDate) => {
  return httpClient.get(
    `/api/creditApplication/evaluate/R6/${id}?birthDate=${birthDate}`
  );
};

const evaluateR7 = (id, data) => {
  return httpClient.post(`/api/creditApplication/evaluate/R7/${id}`, data);
};

const evaluateR77 = (id, data) => {
  return httpClient.post(`/api/creditApplication/evaluate/R77/${id}`, data);
};

const calculateTotalCosts = (id) => {
  return httpClient.put(`/api/creditApplication/evaluate/totalCosts/${id}`);
};

export default {
  create,
  getAll,
  get,
  update,
  simulate,
  evaluateR1,
  evaluateR4,
  evaluateR5,
  evaluateR6,
  evaluateR7,
  calculateTotalCosts,
  evaluateR77,
};
