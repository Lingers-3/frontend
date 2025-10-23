import axios from "axios";

const api = axios.create({
  baseURL: 'https://pocketeer-api.linerds.us/api',
  withCredentials: true, 
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.response.use(
  (res) => res,
  (error) => {
    return Promise.reject(error);
  }
);

export default api;