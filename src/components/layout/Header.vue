<template lang="pug">
    .p-col-12
        Toolbar(:model="items")            
            template(slot="left" v-if="logged")
                Button(icon="pi pi-bars" @click="visibleLeft = true")

            template(slot="right" v-if="logged")
                InputText(placeholder="Search" type="text")
                Button(
                    v-if="logged"
                label="Logout"
                icon="pi pi-power-off"
                :style="{ 'margin-left': '.25em' }"
                )
        Sidebar(:visible.sync="visibleLeft")
          p Menú
          PanelMenu(:model="items")
</template>
<script>
import Toolbar from "primevue/toolbar";
import PanelMenu from "primevue/panelmenu";
import InputText from "primevue/inputtext";
import Button from "primevue/button";
import Sidebar from "primevue/sidebar";

import { mapState } from "vuex";

export default {
  components: { PanelMenu, Toolbar, InputText, Button, Sidebar },
  data() {
    return {
      visibleLeft: false,
      items: [
        {
          label: "Dashboard",
          icon: "pi pi-home",
          command: () => this.$router.push({ name: "Dashboard" })
        },
        {
          label: "Usuarios",
          icon: "pi pi-users",
          items: [{ label: "Ver" }]
        },
        {
          label: "Proyectos",
          icon: "pi pi-briefcase"
        },
        {
          label: "Contratos/Servicios",
          icon: "pi pi-folder"
        },
        {
          label: "Backend",
          icon: "pi pi-external-link",
          command: () => this.$router.push("/login")
        }
      ]
    };
  },
  computed: {
    ...mapState(["logged"])
  }
};
</script>
