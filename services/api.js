import { get } from "./axios";

export const getUsersList = () => {
  return get(`${process.env.API_URL}/users?per_page=${process.env.PAGE_LIMIT}`);
};

export const getUserInfo = (userName) => {
  return get(`${process.env.API_URL}/users/${userName}`);
};
