<template lang="pug">
    .p-grid.p-justify-center.p-fluid
        .p-col-12.p-md-6.p-lg-4.p-justify-center
            img(alt="Vue logo" src="../assets/logo.png")
            form(@submit.prevent="submit")          
                .p-inputgroup.p-justify-center
                    span.p-inputgroup-addon
                        i.pi.pi-user
                    InputText(placeholder="Username" v-model.trim="$v.loginForm.username.$model")
                .p-inputgroup.p-justify-center
                    span.p-inputgroup-addon
                        i.pi.pi-key
                    InputText(type="password" placeholder="Password" v-model.trim="$v.loginForm.password.$model")
                Button(type="submit" label="Login" icon="pi pi-sign-in")
                

        
</template>
<script>
//PrimeVUE
import InputText from "primevue/inputtext";
import Button from "primevue/button";
import { mapActions, mapGetters } from "vuex";

//Vualidator
import { required } from "vuelidate/lib/validators";

export default {
  components: { InputText, Button },
  data() {
    return {
      loginForm: {
        username: "",
        password: ""
      }
    };
  },
  validations: {
    loginForm: {
      username: {
        required
      },
      password: {
        required
      }
    }
  },
  computed: {
    ...mapGetters({ user: "user" })
  },
  methods: {
    ...mapActions(["auth_request"]),
    submit() {
      this.$v.$touch();
      if (this.$v.$invalid) {
        this.$toast.add({
          severity: "error",
          summary: "Login Info",
          detail: "Verifique los datos ingresados",
          life: 3000
        });
      } else {
        this.$toast.add({
          severity: "info",
          summary: "Login Info",
          detail: "Iniciando Sesión",
          life: 3000
        });
        const user = {
          username: this.loginForm.username,
          password: this.loginForm.password
        };
        this.auth_request(user)
          .then(() => {
            this.$toast.add({
              severity: "success",
              summary: "Login Info",
              detail: `Bienvenido ${this.user.first_name}!`,
              life: 3000
            }),
              this.$router.push("/");
          })
          .catch(() => {
            this.$toast.add({
              severity: "error",
              summary: "Login Info",
              detail:
                "Verifique los datos ingresados y su conexión con el servidor",
              life: 3000
            });
          });
      }
    }
  }
};
</script>
<style lang="scss" scoped>
img {
  margin-top: 30px;
  height: 200px;
}
.p-inputgroup {
  margin-top: 10px;
}
.p-button {
  margin-top: 10px;
}
.card {
  /* Add shadows to create the "card" effect */
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  transition: 0.3s;
}

/* On mouse-over, add a deeper shadow */
.card:hover {
  box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.2);
}

/* Add some padding inside the card container */
.container {
  padding: 2px 16px;
}
</style>
