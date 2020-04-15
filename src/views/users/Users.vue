<template lang="pug">
    .p-grid.p-justify-center
        .p-col-12
            h1 Usuarios
        .p-col-12
            ProgressSpinner(v-show="loading")
            DataTable(
                    v-show="!loading"  
                    :value="users"
                    :filters="filters"
                    :paginator="true"
                    :rows="10"
                    :selection.sync="selectedUser"
                    selectionMode="single"
                )
                template(#header)
                    .p-clearfix(style="line-height:1.87em")
                        Button(
                            @click="performUpdate"
                            icon="pi pi-refresh"
                            style="float: left"
                        )
                        Button(   
                            @click="createUser()"                                                     
                            class="p-button-success"
                            icon="pi pi-plus"
                            style="float:left;margin-left: .5em")  
                        span Listado de Usuarios
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
                        field="full_name"
                        header="Nombre"
                        filterMatchMode="contains"
                        :sortable="true"
                    )
                    template(#filter)
                        InputText.p-column-filter(
                            type="string"
                            v-model="filters['full_name']"
                            placeholder="Filtrar por Nombre "
                            style="margin-top:5px")
                Column(                        
                        field="username"
                        header="Username"
                        filterMatchMode="contains"
                        :sortable="true"
                    )
                    template(#filter)
                        InputText.p-column-filter(
                            type="string"
                            v-model="filters['username']"
                            placeholder="Filtrar por Username"
                            style="margin-top:5px")
                Column(                        
                        field="email"
                        header="Email"
                        filterMatchMode="contains"
                        :sortable="true"
                    )
                    template(#filter)
                        InputText.p-column-filter(
                            type="string"
                            v-model="filters['email']"
                            placeholder="Filtrar por Username"
                            style="margin-top:5px")
                Column(                        
                        field="phone_number"
                        header="Teléfono"
                        filterMatchMode="contains"
                        :sortable="true"
                    )
                    template(#filter)
                        InputText.p-column-filter(
                            type="string"
                            v-model="filters['phone_number']"
                            placeholder="Filtrar por Teléfono"
                            style="margin-top:5px")
                Column(                        
                        field="is_superuser"
                        header="Admin"
                        filterMatchMode="contains"
                        :sortable="true"
                    )
                    template(#filter)
                        InputText.p-column-filter(
                            type="string"
                            v-model="filters['is_superuser']"
                            placeholder="Filtrar por Admin"
                            style="margin-top:5px")
                    template(#body="slotProps")                        
                        i(:class="slotProps.data.is_superuser ? 'pi pi-check' : 'pi pi-times'")
                Column(                        
                        field="is_client"
                        header="Cliente"
                        filterMatchMode="contains"
                        :sortable="true"
                    )
                    template(#filter)
                        InputText.p-column-filter(
                            type="boolean"
                            v-model="filters['is_client']"
                            placeholder="Filtrar por Cliente"
                            style="margin-top:5px")
                    template(#body="slotProps")
                        i(:class="slotProps.data.is_client ? 'pi pi-check' : 'pi pi-times'")
                Column(                        
                        field="is_supervisor"
                        header="Supervisor"
                        filterMatchMode="contains"
                        :sortable="true"
                    )
                    template(#filter)
                        InputText.p-column-filter(
                            type="boolean"
                            v-model="filters['is_supervisor']"
                            placeholder="Filtrar por Cliente"
                            style="margin-top:5px")
                    template(#body="slotProps")
                        i(:class="slotProps.data.is_supervisor ? 'pi pi-check' : 'pi pi-times'")
                Column(
                        header="Tools"
                        headerStyle="width: 8em"
                        bodyStyle="text-align: center"
                    )
                    template(#body="slotProps")                        
                        Button(
                            type="button"
                            icon="pi pi-search"
                            @click="showContract(slotProps.data)"
                            class="p-button-success p-button-rounded"
                            style="margin-right: .5em"
                        )
                        Button(
                           type="button"
                           @click="editUser(slotProps.data)"
                           icon="pi pi-pencil"
                           class="p-button-warning p-button-rounded"
                           style="margin-right: .5em" 
                        )
                        Button(
                           type="button"
                           icon="pi pi-minus"
                           class="p-button-danger p-button-rounded"
                        )
        CreateUser(
            v-if="showModal"
            :visible="showModal"
            :creating="creating"
            :user="selectedUser"
            v-on:close="closeModal"
        )
</template>
<script>
//PrimeVue
import ProgressSpinner from "primevue/progressspinner";
import DataTable from "primevue/datatable";
import Column from "primevue/column";
import Button from "primevue/button";
import InputText from "primevue/inputtext";

//API's
import userService from "@/services/usersAPI.js";

//Components
import CreateUser from "@/components/users/CreateUser.vue";

export default {
  components: {
    ProgressSpinner,
    DataTable,
    Column,
    Button,
    InputText,
    CreateUser
  },
  data() {
    return {
      users: null,
      showModal: false,
      creating: false,
      filters: {},
      loading: true,
      selectedUser: null,
      update: () => {
        (this.loading = true),
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
    };
  },
  created() {
    this.update();
  },
  methods: {
    closeModal(update = false) {
      this.showModal = false;
      if (update) {
        this.update();
      }
    },
    createUser() {
      this.showModal = true;
      this.creating = true;
    },
    editUser(user) {
      this.showModal = true;
      this.creating = false;
      this.selectedUser = user;
    },
    performUpdate() {
      this.update();
    }
  }
};
</script>
