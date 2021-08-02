import { geturl, getFetchObjectWithAuth,deleteFetchObject,postFetchObject } from "./config";

export const UserInfo = async (accesstoken) => {
  const url = geturl("user/userinfo");
  return await fetch(url, getFetchObjectWithAuth(accesstoken));
};

export const DeleteUser = async (body) =>{
  const url = geturl("user/deleteuser");
  return await fetch(url, deleteFetchObject(body))
}

export const UserWithCar = async(body) =>{
  const url = geturl("user/userwithcar");
  return await fetch(url, postFetchObject(body))
}
