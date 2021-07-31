import { loginUser, signUpUser, tokenrefresh } from "../api/auth.api";
import { GetRefreshToken, SetAccessToken } from "./cookies";
export const loginuserHandle = async (emailpassobject) => {
  let status = null;
  const responseobject = await loginUser(emailpassobject).then((resp) => {
    status = resp.status;
    return resp.json();
  });
  return { status: status, fetchinfo: responseobject };
};

export const signupuserHandle = async (signupobject) => {
  let status = null;
  const responseobject = await signUpUser(signupobject)
    .then((resp) => {
      status = resp.status;
      return resp.json();
    })
    .catch((e) => {
      status = 505;
    });
  return { status: status, fetchinfo: responseobject };
};

export const refreshToken = async () => {
  let refreshtoken = GetRefreshToken();
  let status = null;
  const response = await tokenrefresh(refreshtoken)
    .then((resp) => {
      status = resp.status;
      return resp.json();
    })
    .catch((e) => {
      status = 505;
    });
  if (status === null || status === 505 || status === 401) return false;
  console.log("Token refresh")
  SetAccessToken(response.accessToken);
  return true;
};
