<template lang="pug">
    .stepsdemo-content
        Card 
            //-Titulo tarjeta
            template(slot="title")
                .p-grid.p-fluid.p-justify-between.wizard-header
                    .p-col-8.wizard-header-content
                        p.card-header-message(style="text-align:left") El Contrato
                    .p-col-2.wizard-header-steps
                        p.card-header-message(style="text-align:left") Paso 2/4
            //-Contenido Tarjeta
            template(slot="content")                
                .p-grid.p-fluid.wizard-content-summary
                    .p-col-12
                        p(style="text-align:left") A continuación ingrese información sobre el contrato.
                        p(style="text-align:left") Por favor suba el archivo antes de precionar Next.
                
                .p-grid.p-fluid.wizard-content
                    .p-col-12
                        p(style="text-align:left") Contrato:

                        FileUpload(
                            name="contract"
                            url="."
                            chooseLabel="Buscar"
                            uploadLabel="Subir"
                            cancelLabel="Cancelar"
                            @upload="onUpload"
                            accept="application/msword, application/vnd.openxmlformats-officedocument.wordprocessingml.document, text/plain, application/pdf, image/*")

                .p-grid.p-fluid.wizard-content
                    .p-col-12.p-md-4.p-lg-4
                        p(style="text-align:left") Fecha de Inicio: {{contract.inicio}}
                        Calendar(
                            style="margin-top:15px;"
                            v-model="contract.inicio"
                            :locale="es"
                            dateFormat="dd.mm.yy"
                            :monthNavigator="true"
                            :yearNavigator="true"
                            yearRange="2018:2030"
                            :inline="true"
                            :showButtonBar="true"
                            )
                    .p-col-12.p-md-4.p-lg-4
                        p(style="text-align:left") Fecha de Fin: {{contract.fin}}
                        Calendar(
                            style="margin-top:15px;"
                            v-model="contract.fin"
                            :locale="es"
                            dateFormat="dd.mm.yy"
                            :monthNavigator="true"
                            :yearNavigator="true"
                            yearRange="2018:2030"
                            :inline="true"
                            :showButtonBar="true"
                            )
                
                .p-grid.p-fluid.wizard-content
                    .p-col-12.p-md-4.p-lg-4
                        p(style="text-align:left") Supervisor:
                        .p-inputgroup(style="margin-top:15px;")
                            Button(icon="pi pi-plus")
                            AutoComplete(v-model="contract.supervisor" field="name" :dropdown="true")
                
                .p-grid.p-fluid.wizard-content
                    .p-col-12.p-md-4.p-lg-4
                        p(style="text-align:left") Valor por hora de Jornadas de Mtto ($):
                        .p-inputgroup
                            Spinner(
                                style="margin-top:15px;"
                                :min="0"
                                :step="1"
                                v-model="contract.valorJornada"
                            )
                            span.p-inputgroup-addon(style="margin-top:15px;") $

            //- Pie de tarjeta
            template(slot="footer")
                .p-grid.p-fluid.p-justify-between.wizard-footer.demo-footer
                    .p-col-4.wizard-footer-back-button
                        Button(
                            label="Back"
                            :disabled="false"
                            @click="prevPage"
                            class="disabled-button"
                            icon="pi pi-angle-left")
                    .p-col-4.wizard-footer-next-button
                        Button(
                            label="Next"
                            @click="nextPage(true)"
                            icon="pi pi-angle-right" iconPos="right")
</template>
<script>
import Card from "primevue/card";
import Button from "primevue/button";
import FileUpload from "primevue/fileupload";
import Calendar from "primevue/calendar";
import AutoComplete from "primevue/autocomplete";
import InputText from "primevue/inputtext";
import Spinner from "primevue/spinner";
export default {
  components: {
    Card,
    Button,
    FileUpload,
    Calendar,
    AutoComplete,
    InputText,
    Spinner
  },
  data() {
    return {
      contract: {
        inicio: null,
        fin: null,
        valorJornada: null,
        supervisor: ""
      },
      es: {
        firstDayOfWeek: 1,
        dayNames: [
          "Domingo",
          "Lunes",
          "Martes",
          "Miércoles",
          "Jueves",
          "Viernes",
          "Sábado"
        ],
        dayNamesShort: ["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"],
        dayNamesMin: ["D", "L", "M", "X", "J", "V", "S"],
        monthNames: [
          "Enero",
          "Febrero",
          "Marzo",
          "Abril",
          "Mayo",
          "Junio",
          "Julio",
          "Agosto",
          "Septiembre",
          "Octubre",
          "Noviembre",
          "Diciembre"
        ],
        monthNamesShort: [
          "Ene",
          "Feb",
          "Mar",
          "Abr",
          "May",
          "Jun",
          "Jul",
          "Ago",
          "Sep",
          "Oct",
          "Nov",
          "Dic"
        ],
        today: "Hoy",
        clear: "Borrar",
        weekHeader: "Sm"
      }
    };
  },
  methods: {
    nextPage(isFormValid) {
      this.submitted = true;

      if (!isFormValid) {
        return;
      }
      this.$emit("nextPage", {
        formData: { contract: this.contract },
        pageIndex: 1
      });
    },
    prevPage() {
      this.$emit("prevPage", { pageIndex: 1 });
    },
    onUpload() {
      this.$toast.add({
        severity: "info",
        summary: "Success",
        detail: "File Uploaded",
        life: 3000
      });
    }
  }
};
</script>
