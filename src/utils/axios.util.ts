import axios from "axios";
import { hostStore } from "../store/host.store";
import { CookieUtil } from "./cookie.util";
const headers = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, PATCH, OPTIONS",
  "Access-Control-Allow-Headers":
    "X-Requested-With, content-type, Authorization",
};

const myAxios = axios.create({
  baseURL: hostStore.url,
  headers: headers,
});

myAxios.interceptors.request.use((config) => {
  let token = CookieUtil.get("token");
  if (!config.headers) return;
  if (token) {
    config.headers.credentials = "include";
    config.headers.Authorization = `Bearer ${token}`;
    config.headers["Access-Control-Allow-Origin"] = "*";
  } else if (config.url != "users/@me/profile")
    config.headers.Authorization = false;
  return config;
});

export default myAxios;
