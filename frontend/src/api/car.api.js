import {
  geturl,
  getFetchObjectWithAuth,
  postFetchObjectWithAuth,
  deleteFetchObjectWithAuth,
  putFetchObjectWithAuth
} from "./config";

export const getUserCars = async (accesstoken) => {
  const url = geturl("car/cars");
  return await fetch(url, getFetchObjectWithAuth(accesstoken));
};
export const addNewCar = async (accesstoken, newcar) => {
  const url = geturl("car/create");
  return await fetch(url, postFetchObjectWithAuth(accesstoken, newcar));
};

export const carDelete = async (accesstoken, carid) => {
  const url = geturl(`car/delete/${carid}`);
  return await fetch(url, deleteFetchObjectWithAuth(accesstoken));
};

export const getCar = async (accesstoken, carid) => {
  const url = geturl(`car/carinfo/${carid}`);
  return fetch(url, getFetchObjectWithAuth(accesstoken));
};
export const updateCar =async(accesstoken,carid, updatedcar)=>{
  const url = geturl(`car/edit/${carid}`);
  return await fetch(url,putFetchObjectWithAuth(accesstoken,updatedcar))
}
