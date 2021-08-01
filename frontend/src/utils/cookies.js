import Cookie from "js-cookie";

export const InsertNewTokens = (tokens) => {
  Cookie.set("accessToken", tokens.accessToken);
  Cookie.set("refreshToken", tokens.refreshToken);
};

export const GetAccessToken = () => {
  return Cookie.get("accessToken");
};

export const GetRefreshToken = () => {
  return Cookie.get("refreshToken");
};

export const SetAccessToken = (newaccesstoken) => {
  Cookie.set("accessToken", newaccesstoken);
};

export const SetRefreshToke = (newrefreshtoken) => {
  Cookie.set("refreshToken", newrefreshtoken);
};

export const DeleteTokens = () => {
  Cookie.remove("accessToken");
  Cookie.remove("refreshToken");
};
