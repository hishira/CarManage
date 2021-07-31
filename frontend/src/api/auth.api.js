import { geturl, postFetchObject } from "./config";

export const loginUser = async (emailpassobject) => {
  const url = geturl("auth/login");
  return await fetch(
    url,
    postFetchObject(emailpassobject)
  )
};
export const signUpUser = async(signupinfo)=>{
  const url = geturl("auth/signup");
  return await fetch(url,postFetchObject(signupinfo))
}
