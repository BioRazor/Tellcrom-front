<template lang="pug">
    .p-grid.p-justify-center
        .p-col-12
            h1 Contratos - Servicios
        .p-col-12
            DataTable(
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
                        field="Cliente"
                        header="Cliente"
                        filterMatchMode="contains"
                        :sortable="true"
                    )
                    template(#filter)
                            InputText.p-column-filter(
                                type="text"
                                v-model="filters['Cliente']"
                                placeholder="Filtrar por Cliente"
                                style="margin-top:5px")
                Column(
                        field="Lugar"
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
                        field="Supervisor"
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
                Column(
                        field="InicioFin"
                        header="Inicio-Fin" 
                        filterMatchMode="contains"
                        :sortable="true"
                    )
                    template(#filter)
                            InputText.p-column-filter(
                                type="text"
                                v-model="filters['InicioFin']"
                                placeholder="Filtrar por Inicio/Fin"
                                style="margin-top:5px")
                Column(
                        field="Estatus"
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
                    template(#body)
                        Button(type="button"
                        icon="pi pi-search"
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
</template>
<script>
import DataTable from "primevue/datatable";
import Column from "primevue/column";
import Button from "primevue/button";
import InputText from "primevue/inputtext";
import Dropdown from "primevue/dropdown";
import OverlayPanel from "primevue/overlaypanel";
export default {
  components: { DataTable, Column, Button, InputText, Dropdown, OverlayPanel },
  data() {
    return {
      filters: {},
      selectedContract: null,
      contracts: [
        {
          id: "1",
          Lugar: "Estadio Caracas",
          Cliente: "MLB",
          Supervisor: "Jose Armando",
          InicioFin: "30/03/2020",
          Estatus: "Activo",
          Tipo: "Contrato"
        },
        {
          id: "2",
          Lugar: "Parafait Perú",
          Cliente: "CoolPark",
          Supervisor: "Jose Armando",
          InicioFin: "1/10/2019",
          Estatus: "Terminado",
          Tipo: "Servicio"
        },
        {
          id: "3",
          Lugar: "Hesperia Tucacas",
          Cliente: "Hesperia WTC",
          Supervisor: "David Abreu",
          InicioFin: "1/10/2020",
          Estatus: "Activo",
          Tipo: "Contrato"
        }
      ],
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
  methods: {
    toggle(event) {
      this.$refs.create.toggle(event);
    },
    goToCreateContract() {
      this.$router.push({ name: "CreateContract" });
    },
    goToCreateService() {}
  }
};
</script>
