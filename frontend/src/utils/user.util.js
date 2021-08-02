import { UserInfo, DeleteUser, UserWithCar } from "../api/user.api";
import { GetAccessToken, DeleteTokens } from "./cookies";
import { clearUserActivity } from "./localstorage";
import { refreshToken } from "./auth.utils";
const InfoUser = async (accesstoken) => {
  let status = null;
  const respobje = await UserInfo(accesstoken).then((resp) => {
    status = resp.status;
    return resp.json();
  });
  return { status: status, fetchobject: respobje };
};

export const GetUserInfoHandle = async () => {
  let token = GetAccessToken();
  let response = await InfoUser(token);
  if (response.status === 401) {
    await refreshToken();
    token = GetAccessToken();
    response = await InfoUser(token);
    if (response.status === 401 || response.status === 404) {
      DeleteTokens();
      clearUserActivity();
      return false;
    }
  }
  return response;
};

export const Delete = async(body)=>{
  let status = null;
  const respobje = await DeleteUser(body).then((resp) => {
    status = resp.status;
    return resp.json();
  });
  return { status: status, fetchobject: respobje };
}

export const  NewUserWithCar = async(body) =>{
  let status = null;
  const responseobject = await UserWithCar(body)
    .then((resp) => {
      status = resp.status;
      return resp.json();
    })
    .catch((e) => {
      status = 505;
    });
  return { status: status, fetchinfo: responseobject };
}
