import SECRET_KEY from "./secret";
const CryptoJS = require("crypto-js");
import SecureStorage from "secure-web-storage";

const secureStorage = new SecureStorage(localStorage, {
  hash: function hash(key) {
    key = CryptoJS.SHA256(key, SECRET_KEY);

    return key.toString();
  },
  encrypt: function encrypt(data) {
    data = CryptoJS.AES.encrypt(data, SECRET_KEY);

    data = data.toString();

    return data;
  },
  decrypt: function decrypt(data) {
    data = CryptoJS.AES.decrypt(data, SECRET_KEY);

    data = data.toString(CryptoJS.enc.Utf8);

    return data;
  }
});

function setLoginData(resp) {
  /**
   * [setLoginData description]
   * Get the response login data and set the user information and
   * token information
   */
  // store the token in localstorage with encrypted key and value
  secureStorage.setItem("user", resp.user);
  // store the user in localstorage with encrypted key and value
  secureStorage.setItem("access_token", resp.access_token);
}

function removeLoginData() {
  secureStorage.removeItem("user");
  secureStorage.removeItem("access_token");
}

const getLoginData = {
  user: () => {
    try {
      return secureStorage.getItem("user");
    } catch (error) {
      return "";
    }
  },
  token: () => {
    try {
      return secureStorage.getItem("access_token");
    } catch (error) {
      return "";
    }
  }
};
export { setLoginData };
export { getLoginData };
export { removeLoginData };
