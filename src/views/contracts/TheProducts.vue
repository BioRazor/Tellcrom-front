<template lang="pug">
    .stepsdemo-content
        Card 
            //-Titulo tarjeta
            template(slot="title")
                .p-grid.p-fluid.p-justify-between.wizard-header
                    .p-col-8.wizard-header-content
                        p.card-header-message(style="text-align:left") Los Productos
                    .p-col-2.wizard-header-steps
                        p.card-header-message(style="text-align:left") Paso 3/4
            
            //-Contenido Tarjeta
            template(slot="content")                
                .p-grid.p-fluid.wizard-content-summary
                    .p-col-12
                        p(style="text-align:left") A continuación ingrese información sobre los productos cubiertos por el contrato/servicio.
                        p(style="text-align:left") Más adelante podrá colocar información detallada acerca de cada uno de los productos (Ubicación, Seriales, Marca, Modelo).
                
                .p-grid.p-fluid.wizard-content
                    .p-col-12.p-md-3.p-lg-3
                        p(style="text-align:left") Cámaras:
                        .p-inputgroup
                            span.p-inputgroup-addon(style="margin-top:15px;")
                                Checkbox(                                    
                                    :binary="true"
                                    v-model="products.camaras.incluido"
                                )
                            Spinner(
                            style="margin-top:15px;"
                            :min="0"
                            :step="1"
                            v-model="products.camaras.cantidad"
                            v-tooltip.top="'Ingrese cantidad de Cámaras'"
                            )

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
import Checkbox from "primevue/checkbox";
import Spinner from "primevue/spinner";
import Tooltip from "primevue/tooltip";

export default {
  components: { Card, Button, Checkbox, Spinner },
  data() {
    return {
      products: {
        camaras: {
          incluido: false,
          cantidad: 0
        },
        nvr: {
          incluido: false,
          cantidad: 0
        },
        dvr: {
          incluido: false,
          cantidad: 0
        },
        centralTelefonica: {
          incluido: false,
          cantidad: 0
        },
        gateway: {
          incluido: false,
          cantidad: 0
        },
        telefonoIP: {
          incluido: false,
          cantidad: 0
        },
        servidor: {
          incluido: false,
          cantidad: 0
        },
        cercoElectrico: {
          incluido: false,
          cantidad: 0
        },
        energizador: {
          incluido: false,
          cantidad: 0
        },
        ups: {
          incluido: false,
          cantidad: 0
        }
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
        formData: {},
        pageIndex: 2
      });
    },
    prevPage() {
      this.$emit("prevPage", { pageIndex: 2 });
    }
  },
  directives: {
    tooltip: Tooltip
  }
};
</script>
