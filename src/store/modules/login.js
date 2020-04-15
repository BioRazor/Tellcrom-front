//API
import userService from "@/services/usersAPI.js";

//LoginUtils
import { setLoginData } from "@/utils/loginUtils.js";
import { getLoginData } from "@/utils/loginUtils.js";
import { removeLoginData } from "@/utils/loginUtils.js";

const state = {
  token: getLoginData.token(),
  user: getLoginData.user(),
  status: ""
};

const getters = {
  isAuthenticated: state => !!state.token,
  status: state => state.status,
  user: state => state.user
};

const actions = {
  auth_request({ commit }, user) {
    return new Promise((resolve, reject) => {
      commit("auth_request");
      userService
        .login(user.username, user.password)
        .then(resp => {
          if (user.remember) {
            setLoginData(resp);
          }
          commit("auth_success", resp);
          resolve(resp);
        })
        .catch(err => {
          commit("auth_error", err);
          removeLoginData();
          reject(err);
        });
    });
  },
  logout({ commit }) {
    return new Promise(resolve => {
      commit("logout");
      removeLoginData();
      resolve();
    });
  }
};

const mutations = {
  auth_request(state) {
    state.status = "loading";
  },
  auth_success(state, resp) {
    state.status = "success";
    state.token = resp.access_token;
    state.user = resp.user;
  },
  auth_error(state) {
    state.status = "error";
  },
  logout(state) {
    state.user = "";
    state.token = "";
  }
};

export default {
  state,
  getters,
  actions,
  mutations
};
