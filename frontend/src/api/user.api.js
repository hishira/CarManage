import { geturl, getFetchObjectWithAuth } from "./config";

export const UserInfo = async (accesstoken) => {
  const url = geturl("user/userinfo");
  return await fetch(url, getFetchObjectWithAuth(accesstoken));
};
