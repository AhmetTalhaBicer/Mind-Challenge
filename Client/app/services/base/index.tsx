import axios from "axios";
import qs from "qs";

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

export default http;
