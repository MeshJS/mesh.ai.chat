import axios from "axios";

const instance = axios.create({
  baseURL: `/api/`,
  withCredentials: true,
});

export async function get(route: string) {
  return await instance
    .get(`${route}`)
    .then((data) => {
      return data;
    })
    .catch((error) => {
      throw error;
    });
}