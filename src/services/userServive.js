import httpRequest from "./httpRequest";

export const fetUsers = (page) => {
  const res = httpRequest.get("/users", { params: { page } });

  return res;
};
