<template lang="pug">
    Dialog(:visible="isVisible"
            modal=true
            v-on:update:visible="close"
            maximizable= true
            :style="{width: '80vw'}"
            position="top"
        )
        template(#header)
            p Contrato: # {{contract.id}}
        TabView
            TabPanel(header="Contrato")
                .p-grid
                    .p-col-12.p-md-6.p-lg-6
                        h4(align="left") Cliente                
                        p Nombre: {{contract.client.user.full_name}}
                        p RIF: {{contract.client.rif}}                                    
                    .p-col-12.p-md-6.p-lg-6                        
                        h4(align="left") Supervisor
                        p Nombre: {{contract.supervisor.full_name}}
            TabPanel(header="Mantenimientos")
            TabPanel(header="Solicitudes de Mantenimientos")
            TabPanel(header="Productos Cubiertos")

</template>
<script>
//PrimeVue
import Dialog from "primevue/dialog";
import TabView from "primevue/tabview";
import TabPanel from "primevue/tabpanel";

//API's
import contractService from "@/services/contractsAPI.js";

export default {
  components: { Dialog, contractService, TabView, TabPanel },
  props: {
    contract: {
      type: Object
    },
    visible: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      maintenancesRequest: null
    };
  },
  functions: {
    setContractData() {
      console.log("prueba");
    }
  },
  methods: {
    close() {
      this.$emit("close");
    }
  },
  computed: {
    isVisible() {
      return this.visible;
    }
  },
  created() {
    console.log("Creado");
    contractService.list_request(this.contract.id).then(resp => {
      this.maintenancesRequest = resp;
      console.log(this.maintenancesRequest);
    });
  },
  watch: {
    contract(newValue) {
      console.log(`${newValue}`);
    }
  }
};
</script>
<style scoped lang="scss">
@import "@/scss/steps.scss";
.p-steps-title {
  color: black;
}
</style>
