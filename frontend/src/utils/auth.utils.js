import { loginUser, signUpUser } from "../api/auth.api";

export const loginuserHandle = async (emailpassobject) => {
  const responseobject = await loginUser(emailpassobject).then((resp) => {
    return { status: resp.status, fetchinfo: resp.json() };
  });
  return responseobject;
};

export const signupuserHandle = async (signupobject) => {
  let status = null;
  const responseobject = await signUpUser(signupobject)
    .then((resp) => {
      status = resp.status;
      return resp.json();
    })
    .catch((e) => console.log(e));
  return { status: status, fetchinfo: responseobject };
};
