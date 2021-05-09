import axios from "axios";

export const get = (url) => {
  const headers = {
    Accept: "application/vnd.github.v3+json",
  };

  return axios
    .get(url, { headers: headers })
    .then((response) => response.data)
    .catch((error) => {
      throw error;
    });
};
