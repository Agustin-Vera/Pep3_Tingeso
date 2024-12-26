import httpClient from "../http-common";

const get = (id) => {
  return httpClient.get(`/api/mortgageLoanCondition/${id}`);
};

export default { get };
