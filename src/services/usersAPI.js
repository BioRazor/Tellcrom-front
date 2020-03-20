import tellcromService from "@/services/tellcromAPI.js";

const userService = {};

userService.login = function(username, password) {
  return tellcromService
    .post("users/login/", { username, password })
    .then(res => res.data);
};

export default userService;
