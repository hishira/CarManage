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
