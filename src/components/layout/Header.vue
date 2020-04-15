<template lang="pug">
    .p-col-12
        Toolbar(:model="items")            
            template(slot="left" v-if="isAuthenticated")
                Button(icon="pi pi-bars" @click="visibleLeft = true")

            template(slot="right" v-if="isAuthenticated")
                InputText(placeholder="Search" type="text")
                Button(
                  v-if="isAuthenticated"
                  label="Logout"
                  icon="pi pi-power-off"
                  :style="{ 'margin-left': '.25em' }"
                  @click="RunLogout"
                )
        Sidebar(:visible.sync="visibleLeft")
          h5 Menú
          b {{user.full_name}} - {{user.username}}

          PanelMenu(:model="items")
        ProgressBar(mode="indeterminate" style="height: .5em" v-show="status=='loading'")
</template>
<script>
//PrimeVue
import Toolbar from "primevue/toolbar";
import PanelMenu from "primevue/panelmenu";
import InputText from "primevue/inputtext";
import Button from "primevue/button";
import Sidebar from "primevue/sidebar";
import ProgressBar from "primevue/progressbar";

//Vuex
import { mapGetters } from "vuex";
import { mapActions } from "vuex";

export default {
  components: { PanelMenu, Toolbar, InputText, Button, Sidebar, ProgressBar },
  data() {
    return {
      visibleLeft: false,
      items: [
        {
          label: "Dashboard",
          icon: "pi pi-home",
          command: () => {
            this.visibleLeft = false; //Oculta el Menu
            this.$router.push({ name: "Dashboard" });
          }
        },

        {
          label: "Contratos/Servicios",
          icon: "pi pi-folder",
          command: () => {
            this.visibleLeft = false;
            this.$router.push({ name: "Contracts" });
          }
        }
      ]
    };
  },
  computed: {
    ...mapGetters(["isAuthenticated", "status", "user"])
  },
  methods: {
    ...mapActions(["logout"]),
    RunLogout() {
      this.logout().then(() => {
        this.$router.push({ name: "Login" });
      });
    }
  },
  created() {
    //Add menu items according to user
    if (this.user.is_superuser) {
      this.items.push(
        {
          label: "Usuarios",
          icon: "pi pi-users",
          command: () => {
            this.visibleLeft = false;
            this.$router.push({ name: "Users" });
          }
        },
        {
          label: "Proyectos",
          icon: "pi pi-briefcase",
          command: () => {
            this.visibleLeft = false;
            this.$router.push({ name: "Projects" });
          }
        },
        {
          label: "Catalogo",
          icon: "pi pi-globe",
          items: [
            {
              label: "Productos",
              icon: "pi pi-shopping-cart"
            },
            {
              label: "Servicios",
              icon: "pi pi-ticket"
            }
          ]
        },
        {
          label: "Backend",
          icon: "pi pi-external-link",
          command: () => {
            this.visibleLeft = false;
            this.$router.push("/login");
          }
        }
      );
    } else {
      this.items.push({
        label: "Mi Usuario",
        icon: "pi pi-user"
      });
    }
  }
};
</script>
