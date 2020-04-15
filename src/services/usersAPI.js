import tellcromService from "@/services/tellcromAPI.js";

const userService = {};

userService.login = function(username, password) {
  return tellcromService
    .post("users/login/", { username, password })
    .then(res => res.data);
};
userService.list = function() {
  return tellcromService.get("users/").then(res => res.data);
};

userService.signup = function(user) {
  console.log(user);
  return tellcromService
    .post("users/signup/", { ...user })
    .then(res => res.data);
};

userService.update = function(user) {
  console.log(user);
  return tellcromService
    .patch(`users/${user.username}/`, { ...user })
    .then(res => res.data);
};

export default userService;
