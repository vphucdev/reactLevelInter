import httpRequest from "./httpRequest";

export const fetUsers = (page) => {
  const res = httpRequest.get("/users", { params: { page } });

  return res;
};

export const postCreateUser = (name, job) => {
  return httpRequest.post("/users", {name, job})
}

export const putUpdateUser = (name, job) => { 
  return httpRequest.post("/users", {name, job})
}
