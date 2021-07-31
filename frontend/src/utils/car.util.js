import { getUserCars } from "../api/car.api";
import { GetAccessToken,DeleteTokens } from "./cookies";
import {clearUserActivity} from "./localstorage"
import {refreshToken} from "./auth.utils"
const GetCars = async (accesstoken) => {
  let status = null;
  const respobj = await getUserCars(accesstoken)
    .then((resp) => {
      status = resp.status;
      return resp.json();
    })
    .catch((e) => {
      status = 505;
    });
  return { status: status, fetchobject: respobj };
};

export const GetUserCars = async()=>{
    let token = GetAccessToken();
    let carresponse = await GetCars(token)
    if(carresponse.status === 401){
        await refreshToken();
        token = GetAccessToken();
        carresponse = await GetCars(token);
        if(carresponse.status === 401){
            DeleteTokens();
            clearUserActivity();
            return false;
        }
        return carresponse
    }
    return carresponse;
}