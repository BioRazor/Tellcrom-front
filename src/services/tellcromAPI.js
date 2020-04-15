const axios = require("axios").default;
import configService from "./config";
import { getLoginData } from "@/utils/loginUtils.js";

const tellcromService = axios.create({
  baseURL: configService.apiUrl
});
//To intercep every request and add Auth token
tellcromService.interceptors.request.use(
  config => {
    let token = getLoginData.token();

    if (token) {
      config.headers["Authorization"] = `Token ${token}`;
    }

    return config;
  },

  error => {
    return Promise.reject(error);
  }
);

export default tellcromService;
