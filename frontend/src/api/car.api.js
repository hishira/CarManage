import { geturl, getFetchObjectWithAuth } from "./config";

export const getUserCars = async (accesstoken) => {
  const url = geturl("car/cars");
  return await fetch(url, getFetchObjectWithAuth(accesstoken));
};
