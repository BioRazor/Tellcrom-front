<template lang="pug">
    Dialog(
        :visible="isVisible"
        modal=true
        v-on:update:visible="close"
        maximizable= true
        position="top"
        :style="{width: '50vw'}"
    )
        template(#header)
            ProgressBar(
                v-show="isLoading"
                mode="indeterminate"
                style="height: .5em"
            )
            h3 {{creating ? "Creando usuario" : "Editando Usuario"}}
        .p-grid.p-fluid
            
            .p-col-12.p-md-6
                span.p-float-label
                    InputText(
                        id="full_name"
                        :disabled="disabledInput"
                        v-model="$v.user.full_name.$model"
                        :class="{'p-error':$v.user.full_name.$invalid && submitted}"
                        )
                    label(for="full_name") Nombre
                ValidationMessage(
                    v-show="$v.user.email.$invalid && submitted"
                    style="font-size: 12px"
                    ) Requerido
            
            .p-col-12.p-md-6
                span.p-float-label
                    InputText(
                        id="username"
                        :disabled="disabledInput"
                        v-model="$v.user.username.$model"
                        :class="{'p-error':$v.user.username.$invalid && submitted}"
                        )
                    label(for="username") Nombre de Usuario
                ValidationMessage(
                    v-show="$v.user.email.$invalid && submitted"
                    style="font-size: 12px"
                    ) Requerido, ingrese solo caracteres.
            
            .p-col-12.p-md-6
                span.p-float-label
                    InputText(
                        id="password"
                        :disabled="disabledInput"
                        v-model="$v.user.password.$model"
                        :class="{'p-error':$v.user.password.$invalid && submitted}"
                        type="password"
                        )
                    label(for="password") Contraseña
                ValidationMessage(
                    v-show="$v.user.email.$invalid && submitted"
                    style="font-size: 12px"
                    ) Requerido.
            
            .p-col-12.p-md-6
                span.p-float-label
                    InputText(
                        id="password_confirmation"
                        :disabled="disabledInput"
                        v-model="$v.user.password_confirmation.$model"
                        :class="{'p-error':$v.user.password_confirmation.$invalid && submitted}"
                        type="password"
                        )
                    label(for="password_confirmation") Confirme Contraseña
                ValidationMessage(
                    v-show="$v.user.email.$invalid && submitted"
                    style="font-size: 12px"
                    ) Requerido.
            
            .p-col-12.p-md-6
                span.p-float-label
                    InputText(
                        id="email"
                        :disabled="disabledInput"                        
                        v-model="$v.user.email.$model"
                        :class="{'p-error':$v.user.email.$invalid && submitted}"                        
                        type="email"
                        )
                    label(for="email") Email
                ValidationMessage(
                    v-show="$v.user.email.$invalid && submitted"
                    style="font-size: 12px"
                    ) Requerido, ingrese email válido.
            
            .p-col-12.p-md-6
                span.p-float-label
                    InputMask(
                        id="phone_number"
                        :disabled="disabledInput"
                        v-model="$v.user.phone_number.$model"
                        :class="{'p-error':$v.user.phone_number.$invalid && submitted}"
                        type="phone"
                        mask="99999999999"                        
                        )
                    label(for="phone_number") Número Telefonico
                ValidationMessage(
                    v-show="$v.user.phone_number.$invalid && submitted"
                    style="font-size: 12px"
                    ) Requerido, ingrese teléfono válido.
            
            .p-col-12.p-md-6
                p Este usuario es:
                SelectButton(
                    v-model="selectedType"
                    :options="userTypes"
                    optionLabel="name"
                    :disabled="disabledInput"
                    )
                

        template(#footer)
            Button(
                label="Crear"
                @click="submit(!$v.user.$invalid)"
                class="p-button-success"
                icon="pi pi-check"
                :disabled="disabledInput"
            )
            Button(
                label="Cancelar"
                @click="close()"
                class="p-button-warning"
                icon="pi pi-times"
                :disabled="disabledInput"
            )
</template>
<script>
//PrimeVue
import Dialog from "primevue/dialog";
import Button from "primevue/button";
import InputText from "primevue/inputtext";
import InputMask from "primevue/inputmask";
import ValidationMessage from "primevue/validationmessage";
import SelectButton from "primevue/selectbutton";
import ProgressBar from "primevue/progressbar";

//Vuelidators
import {
  required,
  requiredIf,
  email,
  alphaNum,
  numeric,
  sameAs,
  minLength
} from "vuelidate/lib/validators";

//API's
import userService from "@/services/usersAPI.js";

export default {
  components: {
    Dialog,
    Button,
    InputText,
    InputMask,
    ValidationMessage,
    SelectButton,
    ProgressBar
  },
  props: {
    user: {
      type: Object,
      default: function() {
        return {
          id: "",
          full_name: "",
          username: "",
          password: "",
          password_confirmation: "",
          email: "",
          is_client: false,
          is_superuser: false,
          is_supervisor: false,
          phone_number: ""
        };
      }
    },
    creating: {
      type: Boolean,
      default: false
    },
    visible: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      submitted: false, //for validation
      selectedType: { name: "Cliente", value: "is_client" },
      disabledInput: false,
      isLoading: false,
      userTypes: [
        { name: "Cliente", value: "is_client" },
        { name: "Supervisor", value: "is_supervisor" },
        { name: "Adminisrador", value: "is_superuser" }
      ]
    };
  },
  created() {
    if (!this.creating) {
      this.selectedType = this.userTypes[
        this.user.is_client
          ? "is_client"
          : this.user.is_supervisor
          ? "is_supervisor"
          : "is_superuser"
      ];
    }
  },
  methods: {
    close() {
      this.$emit("close");
    },
    submit(isFormValid) {
      this.submitted = true;

      if (!isFormValid) {
        return;
      }
      this.disabledInput = true;
      this.isLoading = true;
      this.user[this.selectedType.value] = true;
      if (this.creating) {
        userService
          .signup(this.user)
          .then(resp => {
            this.isLoading = false;
            console.log(resp);
            this.$toast.add({
              severity: "success",
              summary: "Usuarios",
              detail: `${this.user.full_name} creado correctamente`,
              life: 3000
            });
            this.$emit("close", true);
          })
          .catch(err => {
            this.isLoading = false;
            this.disabledInput = false;
            console.log(err.response.data);
            this.$toast.add({
              severity: "error",
              summary: "Usuarios",
              detail: `Ha ocurrido un error`,
              life: 3000
            });
          });
      } else {
        userService
          .update(this.user)
          .then(resp => {
            this.isLoading = false;
            console.log(resp);
            this.$toast.add({
              severity: "success",
              summary: "Usuarios",
              detail: `${this.user.full_name} actualizado correctamente`,
              life: 3000
            });
            this.$emit("close", true);
          })
          .catch(err => {
            this.isLoading = false;
            this.disabledInput = false;
            console.log(err.response.data);
            this.$toast.add({
              severity: "error",
              summary: "Usuarios",
              detail: `Ha ocurrido un error`,
              life: 3000
            });
          });
      }
    }
  },
  computed: {
    isVisible() {
      return this.visible;
    }
  },
  validations: {
    user: {
      id: {
        required: requiredIf(function() {
          return !this.creating;
        }),
        numeric
      },
      username: {
        required,
        alphaNum,
        minLength: minLength(4)
      },
      password: {
        required,
        minLength: minLength(8)
      },
      password_confirmation: {
        required,
        sameAsPassword: sameAs("password")
      },
      full_name: {
        required
      },
      email: {
        required,
        email
      },
      phone_number: {
        required
      },
      is_client: {
        required
      },
      is_superuser: {
        required
      },
      is_supervisor: {
        required
      }
    }
  }
};
</script>
<style lang="scss" scoped>
span {
  margin-top: 10px;
}
</style>
