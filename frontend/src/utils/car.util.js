import { getUserCars, addNewCar, carDelete, getCar, updateCar } from "../api/car.api";
import { GetAccessToken, DeleteTokens } from "./cookies";
import { clearUserActivity } from "./localstorage";
import { refreshToken } from "./auth.utils";
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

export const GetUserCars = async () => {
  let token = GetAccessToken();
  let carresponse = await GetCars(token);
  if (carresponse.status === 401) {
    await refreshToken();
    token = GetAccessToken();
    carresponse = await GetCars(token);
    if (carresponse.status === 401) {
      DeleteTokens();
      clearUserActivity();
      return false;
    }
    return carresponse;
  }
  return carresponse;
};

const CreateCar = async (token, newcar) => {
  let status = null;
  const newcarrespobj = await addNewCar(token, newcar)
    .then((resp) => {
      status = resp.status;
      return resp.json();
    })
    .catch((e) => {
      status = 505;
    });
  return { status: status, fetchobject: newcarrespobj };
};

export const CreateNewCarHandle = async (newcar) => {
  let token = GetAccessToken();
  let response = await CreateCar(token, newcar);
  if (response.status === 401) {
    await refreshToken();
    token = GetAccessToken();
    response = await CreateCar(token, newcar);
    if (response.status === 401) {
      DeleteTokens();
      clearUserActivity();
      return false;
    }
  }
  return response;
};

const DeleteCar = async (accesstoken, carid) => {
  let status = null;
  const deletecarresponse = await carDelete(accesstoken, carid)
    .then((res) => {
      status = res.status;
      return res.json();
    })
    .catch((e) => {
      status = 505;
    });
  return { status: status, fetchobject: deletecarresponse };
};
export const DeleteCarHandle = async (carid) => {
  let token = GetAccessToken();
  let response = await DeleteCar(token, carid);
  if (response.status === 401) {
    await refreshToken();
    token = GetAccessToken();
    response = await DeleteCar(token);
    if (response.status === 401) {
      DeleteTokens();
      clearUserActivity();
      return false;
    }
  }
  return response;
};

const GetCar = async (accesstoken, carid) => {
  let status = null;
  const getcarresponse = await getCar(accesstoken, carid)
    .then((res) => {
      status = res.status;
      return res.json();
    })
    .catch((e) => {
      status = 505;
    });
  return { status: status, fetchobject: getcarresponse };
};

export const GetCarHandle = async (carid) => {
  let token = GetAccessToken();
  let response = await GetCar(token, carid);
  if (response.status === 401) {
    await refreshToken();
    token = GetAccessToken();
    response = await GetCar(token, carid);
    if (response.status === 401) {
      DeleteTokens();
      clearUserActivity();
      return false;
    }
  }
  return response;
};

const UpdateCar = async (accesstoken, carid, updatedcar) => {
  let status = null;
  const getcarresponse = await updateCar(accesstoken, carid, updatedcar)
    .then((res) => {
      status = res.status;
      return res.json();
    })
    .catch((e) => {
      status = 505;
    });
  return { status: status, fetchobject: getcarresponse };
};

export const UpdateCarHandle = async (carid, updatedcar) => {
  let token = GetAccessToken();
  let response = await UpdateCar(token, carid, updatedcar);
  if (response.status === 401) {
    await refreshToken();
    token = GetAccessToken();
    response = await UpdateCar(token, carid, updatedcar);
    if (response.status === 401) {
      DeleteTokens();
      clearUserActivity();
      return false;
    }
  }
  return response;
};