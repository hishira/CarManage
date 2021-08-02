const geturl = (val) => {
  return `http://localhost:9000/${val}`;
};
const getFetchObjectWithAuth = (token) => {
  return {
    mode: "cors",
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      authorization: `Bearer ${token}`,
      "Access-Control-Allow-Origin": "http://localhost:3000",
    },
  };
};
const postFetchObjectWithAuth = (token, object) => {
  return {
    mode: "cors",
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      authorization: `Bearer ${token}`,
      "Access-Control-Allow-Origin": "http://localhost:3000",
    },
    body: JSON.stringify(object),
  };
};
const putFetchObjectWithAuth = (token, object) => {
  return {
    mode: "cors",
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      authorization: `Bearer ${token}`,
      "Access-Control-Allow-Origin": "http://localhost:3000",
    },
    body: JSON.stringify(object),
  };
};
const deleteFetchObjectWithAuth = (token) => {
  return {
    mode: "cors",
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      authorization: `Bearer ${token}`,
      "Access-Control-Allow-Origin": "http://localhost:3000",
    },
  };
};
const deleteFetchObject = (body) => {
  return {
    mode: "cors",
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      "Access-Control-Allow-Origin": "http://localhost:3000",
    },
    body: JSON.stringify(body),
  };
};
const postFetchObject = (object) => {
  return {
    mode: "cors",
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      "Access-Control-Allow-Origin": "http://localhost:3000",
    },
    body: JSON.stringify(object),
  };
};

export {
  geturl,
  getFetchObjectWithAuth,
  postFetchObjectWithAuth,
  putFetchObjectWithAuth,
  deleteFetchObjectWithAuth,
  postFetchObject,
  deleteFetchObject
};
