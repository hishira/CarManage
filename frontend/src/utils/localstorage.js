export const setUserActivity = () => {
  localStorage.setItem("useractive", "true");
};
export const clearUserActivity = () => {
  localStorage.clear();
};
export const getUserActive = () => {
  return localStorage.getItem("useractive");
};
