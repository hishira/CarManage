import { loginUser } from "../api/auth.api";

const loginuserHandle = async (emailpassobject) => {
  const responseobject = await loginUser(emailpassobject).then((resp) => {
    return { status: resp.status, fetchinfo: resp.json() };
  });
  return responseobject;
};
export { loginuserHandle };
