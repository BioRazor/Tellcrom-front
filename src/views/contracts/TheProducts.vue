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
                    .p-col-12(v-for="p in productsCategories" :key="p.id" style="text-align:left")
                        Checkbox(
                          :id="p.id"
                          :inputId="p.id"
                          :name="p.name"
                          :value="p.name"
                          v-model="products"
                        )
                        label(:for="p.id" style="margin-left:5px") {{p.name}}
                      
                          
                        
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

export default {
  components: { Card, Button, Checkbox },
  data() {
    return {
      products: [],
      productsCategories: [
        { id: "1", name: "Cámaras" },
        { id: "2", name: "NVR" },
        { id: "3", name: "DVR" },
        { id: "4", name: "Central Telefónica" },
        { id: "5", name: "Gateway" },
        { id: "6", name: "Teléfono IP" },
        { id: "7", name: "Servidores" },
        { id: "8", name: "Cerco Electrico" },
        { id: "9", name: "UPS" }
      ]
    };
  },
  methods: {
    nextPage(isFormValid) {
      this.submitted = true;

      if (!isFormValid) {
        return;
      }
      this.$emit("nextPage", {
        formData: { products: this.products },
        pageIndex: 2
      });
    },
    prevPage() {
      this.$emit("prevPage", { pageIndex: 2 });
    }
  }
};
</script>
