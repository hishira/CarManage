import { geturl, postFetchObject } from "./config";

const loginUser = async (emailpassobject) => {
  const url = geturl("auth/login");
  return await fetch(
    url,
    postFetchObject(emailpassobject)
  )
};
export { loginUser };
