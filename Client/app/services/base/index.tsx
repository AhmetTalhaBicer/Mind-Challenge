import axios from "axios";
import qs from "qs";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const baseURL = process.env.EXPO_PUBLIC_API_URL;

const http = axios.create({
  baseURL,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json;",
  },
  paramsSerializer: {
    serialize: (params) => {
      return qs.stringify(params, { arrayFormat: "repeat" });
    },
  },
});

http.interceptors.request.use(
  (request) => {
    const token = AsyncStorage.getItem("token");
    if (token) request.headers.Authorization = `Bearer ${token}`;
    return request;
  },
  (error) => {
    return error;
  }
);

export default http;
