//API's
import userService from "@/services/usersAPI.js";

function updateUserList() {
  userService
    .list()
    .then(resp => {
      this.loading = false;
      this.users = resp;
    })
    .catch(() => {
      this.$toast.add({
        severity: "error",
        summary: "Login Info",
        detail: "Verifique su conexión con el servidor",
        life: 3000
      });
    });
}

export { updateUserList };
