const axios = require("axios").default;
import configService from "./config";

const tellcromService = axios.create({
  baseURL: configService.apiUrl
});

export default tellcromService;
