import { UserInfo } from "../api/user.api";
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
