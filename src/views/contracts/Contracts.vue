<template lang="pug">
    .p-grid.p-justify-center
        .p-col-12
            h1 Contratos - Servicios
        .p-col-12
            ProgressSpinner(v-show="loading")
            h2(v-show="contracts && contracts.length == 0") Sin Contratos Aún
            DataTable(
                    v-show="!loading"  
                    :value="contracts"
                    :filters="filters"
                    :paginator="true"
                    :rows="10"
                    :selection.sync="selectedContract"
                    selectionMode="single"
                )
                template(#header)
                    .p-clearfix(style="line-height:1.87em")
                        Button(icon="pi pi-refresh" style="float: left")
                        Button(                            
                            @click="toggle"
                            class="p-button-success"
                            icon="pi pi-plus"
                            style="float:left;margin-left: .5em")  
                        span Listado de Contratos - Servicios
                        div(style="text-align:right")
                            i.pi.pi-search(style="margin:4px 4px 0 0")
                            InputText(v-model="filters['global']" placeholder="Busqueda Global" size="20")
                Column(
                        field="id"
                        header="ID"
                        filterMatchMode="contains"
                        :sortable="true"
                    )
                    template(#filter)
                        InputText.p-column-filter(
                            type="number"
                            v-model="filters['id']"
                            placeholder="Filtrar por ID"
                            style="margin-top:5px")               
                Column(
                        field="client.user.full_name"
                        header="Cliente"
                        filterMatchMode="contains"
                        :sortable="true"
                    )
                    template(#filter)
                            InputText.p-column-filter(
                                type="text"
                                v-model="filters['client.user.full_name']"
                                placeholder="Filtrar por Cliente"
                                style="margin-top:5px")
                    template(#body="slotProps")
                      p {{slotProps.data.client.user.full_name}}
                Column(
                        field="site.name"
                        header="Lugar"
                        filterMatchMode="contains"
                        :sortable="true"
                    )
                    template(#filter)
                        InputText.p-column-filter(
                            type="text"
                            v-model="filters['Lugar']"
                            placeholder="Filtrar por Lugar"
                            style="margin-top:5px")               
                Column(
                        field="supervisor.user.full_name"
                        header="Supervisor"
                        filterMatchMode="contains"
                        :sortable="true"
                    )
                    template(#filter)
                            InputText.p-column-filter(
                                type="text"
                                v-model="filters['Supervisor']"
                                placeholder="Filtrar por Supervisor"
                                style="margin-top:5px")
                    template(#body="slotProps")
                      p {{slotProps.data.client.user.full_name}}
                Column(
                        field="start"
                        header="Inicio" 
                        filterMatchMode="contains"
                        :sortable="true"
                    )
                    template(#filter)
                            InputText.p-column-filter(
                                type="text"
                                v-model="filters['start']"
                                placeholder="Filtrar por Inicio"
                                style="margin-top:5px")
                Column(
                        field="end"
                        header="Fin" 
                        filterMatchMode="contains"
                        :sortable="true"
                    )
                    template(#filter)
                            InputText.p-column-filter(
                                type="text"
                                v-model="filters['end']"
                                placeholder="Filtrar por Fin"
                                style="margin-top:5px")
                Column(
                        field="status"
                        header="Estatus"
                        filterMatchMode="equals"
                        :sortable="true"
                    )
                    template(#filter)
                        Dropdown.p-column-filter(
                            v-model="filters['Estatus']"
                            :options="statuses"
                            optionLabel="status"
                            optionValue="value"
                            placeholder="Seleccione un Estatus"
                            :showClear="true"
                            style="margin-top:5px")
                Column(
                        field="Tipo"
                        header="Tipo"
                        filterMatchMode="equals"
                        :sortable="true"
                    )
                    template(#filter)
                        Dropdown.p-column-filter(
                            v-model="filters['Tipo']"
                            :options="types"
                            optionLabel="type"
                            optionValue="value"
                            placeholder="Seleccione un Estatus"
                            :showClear="true"
                            style="margin-top:5px")
                Column(
                        header="Tools"
                        headerStyle="width: 8em"
                        bodyStyle="text-align: center"
                    )
                    template(#body="slotProps")
                        Button(type="button"
                        icon="pi pi-search"
                        @click="showContract(slotProps.data)"
                        class="p-button-success"
                        style="margin-right: .5em")
                        Button(
                           type="button"
                           icon="pi pi-pencil"
                           class="p-button-warning" 
                        )
        OverlayPanel(ref="create")
            Button(
              @click="goToCreateContract"
              label="Contrato"
              class="p-button-success"
              icon="pi pi-briefcase")
            Button(
              label="Servicio"
              class="p-button-success"
              icon="pi pi-ticket"
              style="margin-left:5px")
        
        //-Modal to show Contract Information
        contractDialog(
          v-if="selectedContract"
          :contract="selectedContract"
          :visible="showingContract"
          v-on:close="closeModal"
        )
</template>
<script>
//PrimeVue
import DataTable from "primevue/datatable";
import Column from "primevue/column";
import Button from "primevue/button";
import InputText from "primevue/inputtext";
import Dropdown from "primevue/dropdown";
import OverlayPanel from "primevue/overlaypanel";
import ProgressSpinner from "primevue/progressspinner";

//Api
import contractService from "@/services/contractsAPI.js";

//Components
import contractDialog from "@/components/contracts/contractDialog.vue";

export default {
  components: {
    DataTable,
    Column,
    Button,
    InputText,
    Dropdown,
    OverlayPanel,
    ProgressSpinner,
    contractDialog
  },
  data() {
    return {
      filters: {},
      loading: false,
      selectedContract: null,
      contracts: null,
      showingContract: false,
      statuses: [
        {
          status: "Activo",
          value: "Activo"
        },
        {
          status: "Suspendido",
          value: "Suspendido"
        },
        {
          status: "Terminado",
          value: "Terminado"
        },
        {
          status: "Cancelado",
          value: "Cancelado"
        }
      ],
      types: [
        {
          type: "Contrato",
          value: "Contrato"
        },
        {
          type: "Servicio",
          value: "Servicio"
        }
      ]
    };
  },
  created() {
    this.loading = true;
    contractService
      .list()
      .then(resp => {
        this.contracts = resp;
        this.loading = false;
      })
      .catch(() => {
        this.$toast.add({
          severity: "error",
          summary: "Login Info",
          detail: "Verifique su conexión con el servidor",
          life: 3000
        });
      });
  },
  methods: {
    toggle(event) {
      this.$refs.create.toggle(event);
    },
    goToCreateContract() {
      this.$router.push({ name: "CreateContract" });
    },
    goToCreateService() {},
    showContract(data) {
      this.selectedContract = data;
      this.showingContract = true;
    },
    closeModal() {
      this.showingContract = false;
    }
  }
};
</script>
