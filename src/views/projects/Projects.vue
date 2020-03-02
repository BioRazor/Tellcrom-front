<template lang="pug">
    .p-grid.p-justify-center
        .p-col-12
            h1 Proyectos
        .p-col-12        
            DataTable(
                    :value="projects"
                    :filters="filters"
                    :paginator="true"
                    :rows="10"
                    :selection.sync="selectedProject"
                    selectionMode="single"
                )
                template(#header)
                    .p-clearfix(style="line-height:1.87em")
                        Button(icon="pi pi-refresh" style="float: left")
                        Button(class="p-button-success" icon="pi pi-plus" style="float:left;margin-left: .5em")                        
                    
                        span Listado de Proyectos
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
                        field="Nombre"
                        header="Proyecto"
                        filterMatchMode="contains"
                        :sortable="true"
                    )
                    template(#filter)
                        InputText.p-column-filter(
                            type="text"
                            v-model="filters['Nombre']"
                            placeholder="Filtrar por Proyecto"
                            style="margin-top:5px")               
                Column(
                        field="Proyectista"
                        header="Proyectista"
                        filterMatchMode="contains"
                        :sortable="true"
                    )
                    template(#filter)
                            InputText.p-column-filter(
                                type="text"
                                v-model="filters['Proyectista']"
                                placeholder="Filtrar por Proyectista"
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
                        field="Inicio"
                        header="Inicio" 
                        filterMatchMode="contains"
                        :sortable="true"
                    )
                    template(#filter)
                            InputText.p-column-filter(
                                type="text"
                                v-model="filters['Inicio']"
                                placeholder="Filtrar por Inicio"
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


            

</template>
<script>
import DataTable from "primevue/datatable";
import Column from "primevue/column";
import Button from "primevue/button";
import InputText from "primevue/inputtext";
import Dropdown from "primevue/dropdown";
export default {
  components: { DataTable, Column, Button, InputText, Dropdown },
  data() {
    return {
      filters: {},
      selectedProject: null,
      projects: [
        {
          id: "1",
          Nombre: "Estadio Caracas",
          Cliente: "MLB",
          Proyectista: "Jose Armando",
          Inicio: "30/03/2020",
          Estatus: "Activo"
        },
        {
          id: "2",
          Nombre: "Parafait Perú",
          Cliente: "CoolPark",
          Proyectista: "Jose Armando",
          Inicio: "1/10/2019",
          Estatus: "Terminado"
        },
        {
          id: "3",
          Nombre: "Hesperia Tucacas",
          Cliente: "Hesperia WTC",
          Proyectista: "David Abreu",
          Inicio: "1/10/2020",
          Estatus: "Activo"
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
      ]
    };
  }
};
</script>
